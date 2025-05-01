FROM nginx:1.21.6

RUN apk add --no-cache curl unzip

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

#COPY ./compose/production/nginx/nginx.conf /etc/nginx/nginx.conf
#COPY ./compose/production/nginx/conf.d/headers.conf /etc/nginx/headers.conf
#COPY ./compose/production/nginx/conf.d/ssl.conf /etc/nginx/ssl.conf
#COPY ./compose/production/nginx/conf.d/mime.types /etc/nginx/mime.types

EXPOSE 80

CMD ["/entrypoint.sh"]
