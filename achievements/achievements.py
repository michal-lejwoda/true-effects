import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone
from datetime import datetime
import asyncio

class LoginTimeAchievements(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        await self.accept()
        await self.start_achievement_timer()

    async def disconnect(self, close_code):
        pass

    async def start_achievement_timer(self):
        if self.user.is_authenticated:
            login_time = self.scope['session'].get('login_time')
            if login_time:
                datetime.fromisoformat()
                login_time = datetime.fromisoformat(login_time)
                elapsed_time = (timezone.now() - login_time).total_seconds()
                wait_time = max(0, 12 * 3600 - elapsed_time)
                await asyncio.sleep(wait_time)
                await self.send_notification()

    async def send_notification(self):
        await self.send(text_data=json.dumps({
            'message': 'You have been logged in for 12 hours!'
        }))

from channels.generic.websocket import AsyncWebsocketConsumer

class EchoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        await self.send(text_data=text_data)
