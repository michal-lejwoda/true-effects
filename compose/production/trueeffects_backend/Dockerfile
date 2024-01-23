FROM python:3.7-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
COPY ./compose/production/trueeffects_backend/entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh
# Zbieranie statycznych plików
RUN python manage.py collectstatic -c --settings=backend.settings.production
#CMD ["gunicorn", "backend.wsgi:application", "-b", "0.0.0.0:8000"]



