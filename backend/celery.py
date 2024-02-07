import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')
os.environ.setdefault('AUTH_USER_MODEL', 'authorization.CustomUser')
app = Celery('tasks', broker='redis://trueeffects_redis:6379/0')
# app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
# from rest_framework.authtoken.models import Token