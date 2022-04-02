FROM node:14-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install 
EXPOSE 8085
CMD [ "node", "./email_amqp.js" ]