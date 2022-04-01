FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install 
COPY ./trade.js .
EXPOSE 8084
CMD [ "node", "./trade.js" ]