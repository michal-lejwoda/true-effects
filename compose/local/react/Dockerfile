FROM node:16
WORKDIR /frontend

COPY ./trueeffectsfrontend /frontend/
COPY ./trueeffectsfrontend/package*.json /frontend/

RUN npm install
CMD ["npm", "run", "start"]