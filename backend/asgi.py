import os

from channels.sessions import SessionMiddlewareStack
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

from achievements.middleware import TokenAuthMiddleware
from achievements.routing import websocket_urlpatterns



django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        SessionMiddlewareStack(
            AuthMiddlewareStack(
                TokenAuthMiddleware(
                    URLRouter(
                        websocket_urlpatterns
                    )
                )
            )
        )
    ),
})

