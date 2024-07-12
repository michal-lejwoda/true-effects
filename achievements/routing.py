from django.urls import re_path
from . import achievements

websocket_urlpatterns = [
    re_path(r'ws/login-time/$', achievements.LoginTimeAchievements.as_asgi()),
]
