from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.utils.timezone import now
from rest_framework.authtoken.models import Token


class LoginTimeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.user.is_authenticated and not request.session.get('login_time'):
            request.session['login_time'] = now().isoformat()
            request.session['test'] = "test"
        return None


@database_sync_to_async
def get_user(token_key):
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return AnonymousUser()


class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope['query_string'].decode())
        token_key = query_string.get('token')
        if token_key:
            scope['user'] = await get_user(token_key[0])
        else:
            scope['user'] = AnonymousUser()
        return await self.inner(scope, receive, send)
