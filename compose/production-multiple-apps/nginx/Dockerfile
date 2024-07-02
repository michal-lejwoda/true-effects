FROM nginx:1.21.6 as nginx_proxy

COPY ./compose/production-multiple-apps/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./compose/production-multiple-apps/nginx/conf.d/headers.conf /etc/nginx/headers.conf
COPY ./compose/production-multiple-apps/nginx/conf.d/ssl.conf /etc/nginx/ssl.conf
COPY ./compose/production-multiple-apps/nginx/conf.d/mime.types /etc/nginx/mime.types

