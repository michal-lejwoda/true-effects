#!/bin/sh
if [ ! -d "node_modules" ]; then
  echo "Brak node_modules, instaluję zależności..."
  npm install
fi
exec "$@"