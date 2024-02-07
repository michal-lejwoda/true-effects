# from celery import Celery
# from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework.authtoken.models import Token
#
# import os
# from celery import Celery
#
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')
# os.environ.setdefault('AUTH_USER_MODEL', 'authorization.CustomUser')
# app = Celery('tasks', broker='redis://trueeffects_redis:6379/0')
# # app.config_from_object('django.conf:settings', namespace='CELERY')
# app.autodiscover_tasks()
from . import celery_app
@celery_app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
# from rest_framework.authtoken.models import Token

@celery_app.task(bind=True)
def send_reset_password_to_mail(email: str):
    try:
        # Pobranie tokenu dla użytkownika o podanym adresie e-mail
        token = Token.objects.get(user__email=email)

        # Budowanie linku resetowania hasła
        url = settings.URL
        context = {
            "email": email,
            "link": f"{url}/reset_password/{token}"
        }

        # Renderowanie szablonu e-maila
        message = render_to_string('reset_password.html', context)

        # Wysłanie e-maila
        send_mail(
            'Reset hasła na stronie trueeffects',
            message,
            settings.EMAIL_HOST_USER,
            ['saxatachi1@gmail.com'],
            html_message=message,
            fail_silently=False,
        )
    except Token.DoesNotExist:
        pass
