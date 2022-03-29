FROM node:14-slim
WORKDIR /usr/src/app
COPY . . 
RUN npm install 
COPY ./authenticate.js .
EXPOSE 8082
CMD [ "node", "./authenticate.js" ]