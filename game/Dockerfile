FROM node:14-slim
WORKDIR /usr/src/app
<<<<<<< Updated upstream
COPY . . 
RUN npm install
=======
COPY package*.json ./
COPY . .
RUN npm install 
>>>>>>> Stashed changes
COPY ./game.js .
EXPOSE 8083
CMD [ "node", "./game.js" ]

