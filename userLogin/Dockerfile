FROM node:14-slim
WORKDIR /usr/src/app
COPY . . 
RUN npm install
COPY ./server.js .
EXPOSE 8090
CMD [ "node", "./server.js" ]

