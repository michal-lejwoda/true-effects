FROM python:3.7-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/

COPY ./compose/local/trueeffects_backend/entrypoint.sh /app/entrypoint.sh
# Zbieranie statycznych plików
RUN python manage.py collectstatic -c


