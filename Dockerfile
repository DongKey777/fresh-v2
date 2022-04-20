FROM node:17.8.0

WORKDIR /usr/src/app

COPY ["./", "./"]

RUN npm install

CMD node app.js