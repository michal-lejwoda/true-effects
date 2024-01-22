import dj_database_url
from decouple import config
from .base import *
DEBUG = True
SECRET_KEY = config('SECRET_KEY')
ALLOWED_HOSTS = ['*']

"""DATABASES"""

DATABASES = {'default': dj_database_url.config(default=config('DATABASE_URL'))}
DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql_psycopg2'

"""STATICFILES"""

STATIC_URL = '/local-backend-static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'local-backend-static')

