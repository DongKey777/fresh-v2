FROM node:17.8.0

WORKDIR /usr/src/app

COPY ["package-lock.json", "/usr/src/app"] && ["package.json", "/usr/src/app"]

RUN ["npm","-g","install"]

COPY [".", "/usr/src/app"]
