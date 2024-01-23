import dj_database_url
from decouple import Config, RepositoryEnv
from .base import *
DEBUG = False
config = Config(RepositoryEnv('.env_production'))
SECRET_KEY = config.get('PRODUCTION_SECRET_KEY')
#TODO
ALLOWED_HOSTS = ['*']

"""DATABASES"""

DATABASES = {'default': dj_database_url.config(default=config.get('PRODUCTION_DATABASE_URL'))}
DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql_psycopg2'

"""STATICFILES"""

STATIC_URL = '/production-static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'production-static')