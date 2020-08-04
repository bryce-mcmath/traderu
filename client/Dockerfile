FROM node:10

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8080 49153

CMD npm run serve

