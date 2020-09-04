FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./data ./data

COPY ./src ./src

ENTRYPOINT [ "npm", "run", "start" ]