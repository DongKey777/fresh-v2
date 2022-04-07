FROM node:17.8.0

WORKDIR /usr/src/app

COPY ["./", "./"]
# COPY ["package-lock.json", "./"]

# COPY ["package.json", "./"]
RUN npm install