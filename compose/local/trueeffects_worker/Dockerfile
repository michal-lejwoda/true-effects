FROM python:3.7-slim-buster

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app
WORKDIR /app

CMD celery -A backend.tasks worker --loglevel=info