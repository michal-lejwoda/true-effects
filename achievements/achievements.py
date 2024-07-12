import asyncio
import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone

from achievements.models import Achievement, UserAchievement, SumLoggedInTime
from backend.tasks import update_spended_time


class LoginTimeAchievements(AsyncWebsocketConsumer):

    async def connect(self):
        self.total_login_time = 0
        self.login_time = timezone.now().isoformat()
        self.user = self.scope["user"]
        self.start_time = timezone.now()
        self.user_group_name = f"user_{self.user.id}"
        await self.channel_layer.group_add(self.user_group_name, self.channel_name)
        await self.accept()
        await self.fetch_initial_data()
        # await self.create_logged_in_tasks()
        # self.keep_alive_task = asyncio.create_task(self.keep_connection_alive())
        self.sum_logged_in_time = asyncio.create_task(self.summary_logged_in_time())
        self.logged_in_time = asyncio.create_task(self.logged_in_timer())
        self.keep_alive_task = asyncio.create_task(self.keep_connection_alive())
        print("Tasks created")
    async def receive(self, text_data):
        # Handle incoming messages from the client here
        print("receive", text_data)

    async def keep_connection_alive(self):
        while True:
            try:
                await self.send(json.dumps({'type': 'ping'}))
                await asyncio.sleep(30)  # Ping every 30 seconds
            except Exception as e:
                print(f"Keep-alive error: {e}")
                break
    async def disconnect(self, close_code):
        print("disconnect")
        disconnect_time = timezone.now()
        spended_time = disconnect_time - self.start_time
        spended_time_in_minutes = spended_time.total_seconds() / 60
        if spended_time_in_minutes > 2:
            update_spended_time.delay(self.user.id,spended_time_in_minutes)





    async def logged_in_timer(self):
        print("logged_in_timer")
        if self.user.is_authenticated:
            login_time = 0
            for achievment in self.actual_logged_in_achievements:
                print("achievement", achievment)
                wait_time = max(0, (achievment['minutes'] - login_time)*60)
                await asyncio.sleep(wait_time)
                await self.send_notification_v3()
                login_time = achievment['minutes']
    async def summary_logged_in_time(self):
        print("summarty_logged_in_time")
        if self.user.is_authenticated:
            for achievment in self.actual_logged_in_achievements:
                print(achievment)
                wait_time = max(0, (achievment['minutes'] - self.sum_time) * 60)
                print(wait_time)
                await asyncio.sleep(wait_time)
                await self.send_notification_v3()

    async def send_notification_v2(self, event):
        print("send_notification_v2 called")
        message = event['message']
        print(f"Sending message to {self.user.id}: {message}")
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def send_notification_v3(self):
        print("send_notification_v3")
        await self.send(text_data=json.dumps({
            'message': 'Message has been sent!'
        }))
    async def send_notifications(self, event):
        print("send_notifications called")
        print("event")
        print(event)
        message = event['text']['message']
        print(f"Sending message to {self.user.id}: {message}")
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def fetch_initial_data(self):
        sum_logged_in_task = asyncio.create_task(self.fetch_not_achieved_summary_logged_in_data())
        actual_logged_in_task = asyncio.create_task(self.fetch_not_achieved_actually_logged_in_data())
        sum_time = asyncio.create_task(self.summary_time())
        data1, data2, data3 = await asyncio.gather(sum_logged_in_task, actual_logged_in_task, sum_time)
        self.sum_logged_in_achievements = data1
        self.actual_logged_in_achievements = data2
        self.sum_time = data3

    async def create_logged_in_tasks(self):
        print("Inside create_logged_in_tasks")
        self.sum_logged_in_timer = asyncio.create_task(self.summary_logged_in_time())
        self.logged_in_timer = asyncio.create_task(self.logged_in_timer())
        self.keep_alive_task = asyncio.create_task(self.keep_connection_alive())
        print("Tasks created")
        await asyncio.gather(self.sum_logged_in_timer, self.logged_in_timer, self.keep_alive_task)
        print("After await gather in create_logged_in_tasks")
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