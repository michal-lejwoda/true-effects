FROM python:3.7-slim-buster

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt /app/

RUN pip install -r requirements.txt
RUN rm -rf /root/.cache

COPY . /app/
COPY ./.envs/production /app/.envs/production
COPY ./compose/production/django/entrypoint.sh /app/

RUN chmod +x /app/entrypoint.sh




