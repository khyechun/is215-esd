FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install 
COPY ./server.js .
EXPOSE 8090
CMD [ "node", "./userLogin.js" ]