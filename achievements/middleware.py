from django.utils.timezone import now

class LoginTimeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.user.is_authenticated and not request.session.get('login_time'):
            request.session['login_time'] = now().isoformat()
        return None