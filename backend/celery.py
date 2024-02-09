import os
from celery import Celery

app = Celery('tasks', broker=f"redis://{os.environ.get('REDIS_CONTAINER')}:6379/0")
app.autodiscover_tasks()