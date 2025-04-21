FROM redis:latest
ARG ENV=local
ENV ENV=${ENV}
COPY ./compose/local/redis/redis.conf /usr/local/etc/redis/redis.conf
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]