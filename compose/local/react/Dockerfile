FROM node:16
WORKDIR /frontend

COPY ./trueeffectsfrontend/package*.json /frontend/

RUN npm install

COPY ./trueeffectsfrontend /frontend/

COPY ./compose/local/react/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "start"]