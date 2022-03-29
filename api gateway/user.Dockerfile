FROM node:14-slim
WORKDIR /usr/src/app
COPY . . 
RUN npm install 
COPY ./user.js .
EXPOSE 8081
CMD [ "node", "./user.js" ]