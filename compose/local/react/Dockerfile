FROM node:16 as builder

ARG ENV=local
ENV ENV=${ENV}
WORKDIR /frontend

COPY ./trueeffectsfrontend/package*.json /frontend/
RUN npm install

FROM node:16

ARG ENV=local
ENV ENV=${ENV}
WORKDIR /frontend

COPY --from=builder /frontend /frontend

COPY ./trueeffectsfrontend /frontend/

COPY ./compose/local/react/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "start"]
