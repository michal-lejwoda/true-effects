from celery import Celery
from django.core.mail import send_mail
from django.template.loader import render_to_string

app = Celery('tasks', broker='redis://trueeffects_redis:6379/0')

@app.task
def add(x, y):
    context = {
        "username": "testowy user",
        "link": "https://testowy"
    }
    message = render_to_string('reset_password.html', context)
    send_mail(
        'Temat wiadomości',
        message,
        'walt.kowalski345@gmail.com',
        ['saxatachi1@gmail.com'],
        html_message=message,  # Wysyłanie wiadomości HTML
        fail_silently=False,
    )

    print("xy")
    return x + y