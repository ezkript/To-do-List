FROM node:18

WORKDIR /usr
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001
CMD [ "npm", "run", "dev" ]
