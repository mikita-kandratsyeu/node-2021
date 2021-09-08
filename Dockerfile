FROM node

WORKDIR /container

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]