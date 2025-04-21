FROM python:3.7-slim-buster
ARG ENV=local
ENV ENV=${ENV}
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app/
COPY ./compose/local/django/entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean


