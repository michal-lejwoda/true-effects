FROM nginx:1.21.6-alpine

RUN apk add --no-cache curl unzip

COPY ./compose/azure-dev/nginx/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh



COPY ./compose/azure-dev/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./compose/azure-dev/nginx/conf.d/headers.conf /etc/nginx/headers.conf
COPY ./compose/azure-dev/nginx/conf.d/ssl.conf /etc/nginx/ssl.conf
COPY ./compose/azure-dev/nginx/conf.d/mime.types /etc/nginx/mime.types

EXPOSE 80

CMD ["/entrypoint.sh"]
