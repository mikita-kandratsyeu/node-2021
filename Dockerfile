FROM node

WORKDIR /container

COPY package.json /container/
COPY package-lock.json /container/

RUN npm install

COPY . .

CMD ["npm", "run", "start"]