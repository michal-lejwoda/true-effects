from celery import Celery


import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')
os.environ.setdefault('AUTH_USER_MODEL', 'authorization.CustomUser')
app = Celery('tasks', broker='redis://trueeffects_redis:6379/0')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
# from rest_framework.authtoken.models import Token