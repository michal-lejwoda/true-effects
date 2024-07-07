#!/bin/sh
#. /app/.env_production
. /app/.envs/production/.postgres
check_postgres_ready(){
POSTGRES_DB=$POSTGRES_DB POSTGRES_USER=$POSTGRES_USER POSTGRES_PASSWORD=$POSTGRES_PASSWORD POSTGRES_HOST=$POSTGRES_HOST POSTGRES_PORT=$POSTGRES_PORT python3 - <<END
import os
import sys
import psycopg2
POSTGRES_DB = os.environ.get('POSTGRES_DB')
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD')
POSTGRES_HOST = os.environ.get('POSTGRES_HOST')
POSTGRES_PORT = os.environ.get('POSTGRES_PORT')
try:
    psycopg2.connect(
        dbname="${POSTGRES_DB}",
        user="${POSTGRES_USER}",
        password="${POSTGRES_PASSWORD}",
        host="${POSTGRES_HOST}",
        port="${POSTGRES_PORT}",
    )
except psycopg2.OperationalError as e:
    print(e)
    sys.exit(-1)
sys.exit(0)
END
}
until check_postgres_ready; do
    >&2 echo 'Waiting for PostgreSQL to become available...'
    sleep 1
done
python manage.py migrate --settings=backend.settings.production
python manage.py collectstatic --clear --noinput --settings=backend.settings.production
exec gunicorn backend.wsgi:application -b 0.0.0.0:8000