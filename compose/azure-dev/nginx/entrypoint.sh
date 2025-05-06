#!/bin/sh

echo "Download build.zip from $BLOB_URL..."
curl -o /tmp/build.zip $BLOB_URL

echo "Unpacking..."
unzip -o /tmp/build.zip -d /usr/share/nginx/html

echo "Start NGINX..."
nginx -g "daemon off;"