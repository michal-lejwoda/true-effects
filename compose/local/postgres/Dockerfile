FROM postgres:16.5-bullseye
ARG ENV=local
ENV ENV=${ENV}
# Install apt packages
RUN apt-get update && apt-get install --no-install-recommends -y \
  # dependencies for building Python packages
  wget


COPY ./compose/local/postgres/maintenance /usr/local/bin/maintenance

RUN chmod +x /usr/local/bin/maintenance/*
RUN mv /usr/local/bin/maintenance/* /usr/local/bin \
    && rmdir /usr/local/bin/maintenance

RUN mkdir -p /backups