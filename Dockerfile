FROM node:10

WORKDIR /usr/src/app

RUN mkdir server && mkdir client

COPY package*.json ./

COPY /server/package*.json ./server/
COPY /client/package*.json ./client/
COPY lerna.json .

RUN npm i && npm run lerna-install

COPY . .

EXPOSE 8080

CMD npm run dev

