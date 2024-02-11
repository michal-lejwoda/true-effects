import os
from celery import Celery

app = Celery('tasks', broker=os.environ.get("REDIS_URL"))
app.autodiscover_tasks()