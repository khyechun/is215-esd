FROM node:14-slim
WORKDIR /usr/src/app
COPY . . 
RUN npm install 
COPY ./item.js .
EXPOSE 8088
CMD [ "node", "./item.js" ]