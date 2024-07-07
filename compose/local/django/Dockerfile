FROM python:3.7-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
COPY ./compose/local/django/entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh


