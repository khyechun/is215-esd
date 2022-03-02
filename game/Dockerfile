FROM node:14-slim
WORKDIR /usr/src/app
COPY . . 
RUN npm install 
COPY ./game.js .
EXPOSE 8080
CMD [ "node", "./game.js" ]

