#!/bin/sh
#TODO Back here
set -e
python manage.py compilemessages
python manage.py migrate
python manage.py runserver 0.0.0.0:80
exec "$@"