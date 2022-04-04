FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install 
COPY ./authenticate.js .
EXPOSE 8082
CMD [ "node", "./authenticate.js" ]