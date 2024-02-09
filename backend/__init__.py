from .celery import app as celery_app
from django.conf import settings
def initialize_django():
    from django.apps import apps
    if not apps.ready:
        apps.populate(settings.INSTALLED_APPS)
        from rest_framework.authtoken.models import Token

initialize_django()
__all__ = ('celery_app',)