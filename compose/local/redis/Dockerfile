FROM redis:latest
COPY ./compose/local/redis/redis.conf /usr/local/etc/redis/redis.conf
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]