import dj_database_url
from decouple import Config, RepositoryEnv
from .base import *
DEBUG = True
config = Config(RepositoryEnv('.env_local'))
SECRET_KEY = config.get('SECRET_KEY')
ALLOWED_HOSTS = ['*']
"""DATABASES"""

DATABASES = {'default': dj_database_url.config(default=config.get('DATABASE_URL'))}
DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql_psycopg2'

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://trueeffects_redis:6379/1',  # Replace with your Redis server information
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

"""STATICFILES"""

STATIC_URL = '/local-backend-static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'local-backend-static')

