import asyncio
import json
from urllib.parse import parse_qs

from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone, translation
from django.utils.translation import gettext as _

from achievements.models import Achievement, UserAchievement, SumLoggedInTime
from backend.tasks import update_spended_time


class LoginTimeAchievements(AsyncWebsocketConsumer):

    async def connect(self):
        query_string = self.scope['query_string'].decode()
        query_params = parse_qs(query_string)
        self.language = query_params.get('language', [None])[0]
        self.login_time = timezone.now().isoformat()
        self.total_login_time = 0
        self.user = self.scope["user"]
        self.start_time = timezone.now()
        self.user_group_name = f"user_{self.user.id}"
        await self.channel_layer.group_add(self.user_group_name, self.channel_name)
        await self.accept()
        await self.fetch_initial_data()
        self.sum_logged_in_time = asyncio.create_task(self.summary_logged_in_time())
        self.logged_in_time = asyncio.create_task(self.logged_in_timer())
        self.keep_alive_task = asyncio.create_task(self.keep_connection_alive())

    async def receive(self, text_data):
        print("receive")
        text_data_json = json.loads(text_data)
        print("text_data_json", text_data_json)
        action = text_data_json.get('action')
        language = text_data_json.get('language')
        print("language", language)
        if action == 'update_language':
            print("update_langeuage")
            print(language)
            self.language = language

    async def keep_connection_alive(self):
        while True:
            try:
                # await self.send(json.dumps({'type': 'ping'}))
                await asyncio.sleep(30)
            except Exception as e:
                print(f"Keep-alive error: {e}")
                break

    async def disconnect(self, close_code):
        print("disconnect")
        disconnect_time = timezone.now()
        spended_time = disconnect_time - self.start_time
        spended_time_in_minutes = spended_time.total_seconds() / 60
        if spended_time_in_minutes > 2:
            update_spended_time.delay(self.user.id, spended_time_in_minutes)

    async def logged_in_timer(self):
        print("logged_in_timer")
        print(self.actual_logged_in_achievements)
        if self.user.is_authenticated:
            login_time = 0
            for achievement in self.actual_logged_in_achievements:
                print("logged achievement", achievement)
                wait_time = max(0, (achievement['minutes'] - login_time) * 60)
                print("wait_time", wait_time)
                await asyncio.sleep(wait_time)
                user_achievement_id = await self.create_user_achievement(achievement)
                await self.create_notification_from_backend(user_achievement_id, achievement['message'])
                login_time = await achievement['minutes']

    async def summary_logged_in_time(self):
        print("summarty_logged_in_time")
        if self.user.is_authenticated:
            for achievement in self.sum_logged_in_achievements:
                print("summary achievement", achievement)
                wait_time = max(0, (achievement['minutes'] - self.sum_time) * 60)
                await asyncio.sleep(wait_time)
                user_achievement_id =  await self.create_user_achievement(achievement)
                print("user_achievement_id", user_achievement_id)
                await self.create_notification_from_backend(user_achievement_id, achievement['message'])

    @sync_to_async
    def create_user_achievement(self, achievement):
        print("create_user_achievement")
        try:
            achievement_obj, created = UserAchievement.objects.get_or_create(
                achievement_id=achievement['id'],
                user= self.user,
                defaults={
                    'is_earned': True,
                    'user': self.user,
                    'is_displayed_for_user': False
                }
            )

            return achievement_obj.id
        except Exception as e:
            print(f"Error creating user achievement: {e}")
            return None

    async def create_notification_from_backend(self, user_achievement_id, message):
        print("create_notification_from_backend")
        translation.activate(self.language)
        message = _(message)
        print("wysylanie")
        await self.send(text_data=json.dumps({
            'user_achievement_id': user_achievement_id,
            'message': message
        }))

    async def send_notifications(self, event):
        translation.activate(self.language)
        message = _(event['text']['message'])
        print(f"Sending message to {self.user.id}: {message}")
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def fetch_initial_data(self):
        print("fetch_initial_data")
        sum_logged_in_task = asyncio.create_task(self.fetch_not_achieved_summary_logged_in_data())
        actual_logged_in_task = asyncio.create_task(self.fetch_not_achieved_actually_logged_in_data())
        sum_time = asyncio.create_task(self.summary_time())
        data1, data2, data3 = await asyncio.gather(sum_logged_in_task, actual_logged_in_task, sum_time)
        self.sum_logged_in_achievements = data1
        self.actual_logged_in_achievements = data2
        self.sum_time = data3

    async def create_logged_in_tasks(self):
        self.sum_logged_in_timer = asyncio.create_task(self.summary_logged_in_time())
        self.logged_in_timer = asyncio.create_task(self.logged_in_timer())
        self.keep_alive_task = asyncio.create_task(self.keep_connection_alive())
        await asyncio.gather(self.sum_logged_in_timer, self.logged_in_timer, self.keep_alive_task)

    @database_sync_to_async
    def summary_time(self):
        sum_logged_in_time, created = SumLoggedInTime.objects.get_or_create(user=self.user)
        return sum_logged_in_time.time

    @database_sync_to_async
    def fetch_not_achieved_summary_logged_in_data(self):
        return list(Achievement.objects.filter(type_achievement__name='SUM_LOGGED_TIME').exclude(
            id__in=UserAchievement.objects.filter(user=self.user).values_list('achievement_id', flat=True)
        ).order_by('minutes').values())

    @database_sync_to_async
    def fetch_not_achieved_actually_logged_in_data(self):
        print(list(Achievement.objects.filter(type_achievement__name='LOGGED_TIME').exclude(
            id__in=UserAchievement.objects.filter(user=self.user).values_list('achievement_id', flat=True)
        ).order_by('minutes').values()))
        return list(Achievement.objects.filter(type_achievement__name='LOGGED_TIME').exclude(
            id__in=UserAchievement.objects.filter(user=self.user).values_list('achievement_id', flat=True)
        ).order_by('minutes').values())

    async def fetch_not_achieved_data(self):
        self.not_achieved = await self.fetch_not_achieved_achievements()

    @database_sync_to_async
    def get_not_achieved_achievements(self):
        return list(Achievement.objects.exclude(
            id__in=UserAchievement.objects.filter(user=self.user).values_list('achievement_id', flat=True)
        ).values())

    async def fetch_not_achieved_achievements(self):
        data = await self.get_not_achieved_achievements()
        return data

    async def fetch_data_from_db1(self):
        data = await self.get_data_from_db1()
        await self.send(text_data=json.dumps({
            'message': 'Fetched data from DB1!',
            'data': data
        }))
        return data

    async def fetch_data_from_db2(self):
        data = await self.get_data_from_db2()
        await self.send(text_data=json.dumps({
            'message': 'Fetched data from DB2!',
            'data': data
        }))
        return data
