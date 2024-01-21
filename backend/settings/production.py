import dj_database_url
from decouple import config
from base import *
DEBUG = False
SECRET_KEY = config('PRODUCTION_SECRET_KEY')
#TODO
ALLOWED_HOSTS = ['*']

"""DATABASES"""

DATABASES = {'default': dj_database_url.config(default=config('PRODUCTION_DATABASE_URL'))}
DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql_psycopg2'

"""STATICFILES"""

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
