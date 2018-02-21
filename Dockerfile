FROM node:8.1.4
LABEL maintainer="evidence management"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]
