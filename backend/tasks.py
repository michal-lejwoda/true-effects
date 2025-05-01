# from celery import Celery
# from celery import shared_task
#TODO TRANSLATE
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework.authtoken.models import Token

from . import celery_app

@celery_app.task()
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
            [email],
            html_message=message,
            fail_silently=False,
        )
    except Token.DoesNotExist:
        pass
