FROM node:14.17.0

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

RUN ls

EXPOSE 3000



