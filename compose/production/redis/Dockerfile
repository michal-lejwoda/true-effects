FROM redis:latest
COPY ./compose/production/redis/redis.conf /usr/local/etc/redis/redis.conf
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]