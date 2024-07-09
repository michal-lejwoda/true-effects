from django.urls import re_path
from . import achievements

websocket_urlpatterns = [
    re_path(r'ws/echo/$', achievements.EchoConsumer.as_asgi()),
    re_path(r'ws/notify/$', achievements.LoginTimeAchievements.as_asgi()),
]
