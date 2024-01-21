FROM node:16
WORKDIR /frontend

COPY ./trueeffectsfrontend /frontend/
COPY ./trueeffectsfrontend/package*.json /frontend/

RUN npm install
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]
#RUN npm install
#EXPOSE 3000
#CMD [ "npm", "start" ]