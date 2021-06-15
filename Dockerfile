FROM node:16.3.0

ENV NODE_ENV=production

WORKDIR /usr

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install -g ts-node

COPY . .

EXPOSE 8080

CMD ["npm","run","start:prod"]