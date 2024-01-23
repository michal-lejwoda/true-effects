#!/bin/sh

python manage.py migrate --settings=backend.settings.production
python manage.py collectstatic --clear --noinput --settings=backend.settings.production
exec gunicorn backend.wsgi:application -b 0.0.0.0:8000