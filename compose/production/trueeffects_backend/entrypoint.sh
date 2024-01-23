#!/bin/sh

python manage.py migrate
exec gunicorn backend.wsgi:application -b 0.0.0.0:8000