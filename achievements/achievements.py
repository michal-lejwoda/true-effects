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
        self.check_not_shown_achievements = asyncio.create_task(self.check_not_shown_achievements())
        self.sum_logged_in_time = asyncio.create_task(self.summary_logged_in_time())
        self.logged_in_time = asyncio.create_task(self.logged_in_timer())
        self.keep_alive_task = asyncio.create_task(self.keep_connection_alive())

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        action = text_data_json.get('action')
        language = text_data_json.get('language')
        if action == 'update_language':
            self.language = language

    #TODO Check this one
    async def keep_connection_alive(self):
        while True:
            try:
                await asyncio.sleep(30)
            except Exception as e:
                break

    async def disconnect(self, close_code):
        if hasattr(self, 'check_not_shown_achievements') and self.check_not_shown_achievements:
            self.check_not_shown_achievements.cancel()
        if hasattr(self, 'sum_logged_in_time') and self.sum_logged_in_time:
            self.sum_logged_in_time.cancel()
        if hasattr(self, 'logged_in_time') and self.logged_in_time:
            self.logged_in_time.cancel()
        if hasattr(self, 'keep_alive_task') and self.keep_alive_task:
            self.keep_alive_task.cancel()
        disconnect_time = timezone.now()
        spended_time = disconnect_time - self.start_time
        spended_time_in_minutes = spended_time.total_seconds() / 60
        if spended_time_in_minutes > 2:
            update_spended_time.delay(self.user.id, spended_time_in_minutes)
        await self.channel_layer.group_discard(self.user_group_name, self.channel_name)
        self.check_not_shown_achievements = None
        self.sum_logged_in_time = None
        self.logged_in_time = None
        self.keep_alive_task = None
        self.user = None
        self.scope = None
        del self

    async def logged_in_timer(self):
        if self.user.is_authenticated:
            login_time = 0
            for achievement in self.actual_logged_in_achievements:
                wait_time = max(0, (achievement['minutes'] - login_time) * 60)
                await asyncio.sleep(wait_time)
                user_achievement_id = await self.create_user_achievement(achievement)
                await self.create_notification_from_backend(user_achievement_id, achievement['message'])
                login_time = await achievement['minutes']

    async def summary_logged_in_time(self):
        if self.user.is_authenticated:
            for achievement in self.sum_logged_in_achievements:
                wait_time = max(0, (achievement['minutes'] - self.sum_time) * 60)
                await asyncio.sleep(wait_time)
                user_achievement_id = await self.create_user_achievement(achievement)
                await self.create_notification_from_backend(user_achievement_id, achievement['message'])

    async def check_not_shown_achievements(self):
        for user_achievement in self.not_shown_achievements:
            await self.create_notification_from_backend(user_achievement['id'],
                                                        user_achievement['achievement__message'])

    @sync_to_async
    def create_user_achievement(self, achievement):
        try:
            achievement_obj, created = UserAchievement.objects.get_or_create(
                achievement_id=achievement['id'],
                user=self.user,
                defaults={
                    'is_earned': True,
                    'user': self.user,
                    'is_displayed_for_user': False
                }
            )

            return achievement_obj.id
        except Exception as e:
            return None

    async def create_notification_from_backend(self, user_achievement_id, message):
        translation.activate(self.language)
        message = _(message)
        await self.send(text_data=json.dumps({
            'user_achievement_id': user_achievement_id,
            'message': message
        }))

    async def send_notifications(self, event):
        translation.activate(self.language)
        message = _(event['message'])
        await self.send(text_data=json.dumps({
            'user_achievement_id': event['user_achievement_id'],
            'message': message
        }))

    async def fetch_initial_data(self):
        sum_logged_in_task = asyncio.create_task(self.fetch_not_achieved_summary_logged_in_data())
        actual_logged_in_task = asyncio.create_task(self.fetch_not_achieved_actually_logged_in_data())
        sum_time = asyncio.create_task(self.summary_time())
        not_shown_achievements = asyncio.create_task(self.fetch_not_shown_achievements())
        data1, data2, data3, data4 = await asyncio.gather(sum_logged_in_task, actual_logged_in_task, sum_time,
                                                          not_shown_achievements
                                                          )
        self.sum_logged_in_achievements = data1
        self.actual_logged_in_achievements = data2
        self.sum_time = data3
        self.not_shown_achievements = data4

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
        return list(Achievement.objects.filter(type_achievement__name='LOGGED_TIME').exclude(
            id__in=UserAchievement.objects.filter(user=self.user).values_list('achievement_id', flat=True)
        ).order_by('minutes').values())

    @database_sync_to_async
    def fetch_not_shown_achievements(self):
        achievements_with_user_ids = UserAchievement.objects.filter(
            user=self.user,
            is_displayed_for_user=False
        ).select_related('achievement').order_by('achievement__minutes').values(
            'id',
            'achievement__id',
            'achievement__minutes',
            'achievement__message',
        )

        return list(achievements_with_user_ids)

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
