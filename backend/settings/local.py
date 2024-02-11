import dj_database_url
from decouple import Config, RepositoryEnv
from .base import *
DEBUG = True
config = Config(RepositoryEnv('.env_local'))
URL = config('URL')
SECRET_KEY = config.get('SECRET_KEY')
ALLOWED_HOSTS = ['*']

"""DATABASES"""

DATABASES = {'default': dj_database_url.config(default=config.get('DATABASE_URL'))}
DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql_psycopg2'

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': config.get('REDIS_URL'),  # Replace with your Redis server information
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

"""STATICFILES"""

STATIC_URL = '/local-backend-static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'local-backend-static')

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config.get('EMAIL_HOST_PASSWORD')
