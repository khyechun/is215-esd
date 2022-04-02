FROM node:14-slim
WORKDIR /usr/src/app
COPY . . 
RUN npm install
EXPOSE 8094
CMD [ "node", "./getItems.js" ]