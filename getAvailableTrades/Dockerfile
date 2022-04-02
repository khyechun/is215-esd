FROM node:14-slim
WORKDIR /usr/src/app
COPY . . 
RUN npm install
EXPOSE 8093
CMD [ "node", "./getAvailableTrade.js"]
