FROM node:10

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm i 

COPY . .

EXPOSE 8000

CMD npm run docker

