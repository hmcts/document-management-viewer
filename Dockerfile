FROM node:8.1.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN yarn install
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]
