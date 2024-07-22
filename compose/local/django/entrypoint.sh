#!/bin/sh
#TODO Back here
python manage.py compilemessages
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
exec "$@"