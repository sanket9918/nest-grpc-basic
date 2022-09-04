FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY  yarn.lock ./

RUN yarn

COPY . .

EXPOSE 50051

CMD [ "yarn", "start:dev" ]