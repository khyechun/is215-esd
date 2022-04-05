# HosehTrades


**Steam** is a video game digital distribution service and storefront developed by Valve. It is a one stop platform for users to play, discuss and create new games. It is currently one of the most popular gaming platforms, boasting over 25 million monthly active users. Despite being one of the biggest gaming platforms, we realised that there was no **dedicated feature/platform** within Steam for users to trade in-game items with one another.

Therefore, we have decided to develop HosehTrades, a one stop platform that facilitates trading of Steam items between users. In addition, to prevent bots from using our website, all users must be authenticated with their Steam account before being allowed to post a trade on our platform. The following are the 3 user scenarios we will be covering:



## Installation for docker-compose

Navigate the command prompt to the directory of the apigateway folder

```bash
cd apigateway/ 
```

## Running the docker-compose.yml 

```bash
docker-compose up -d
```

****

## Installation for Kong API Gateway

Navigate the command prompt to the directory of the apigateway folder

```bash
cd apigateway/kong
```

## Running the docker-compose.yml 

```bash
docker-compose up -d
```

****

## Installation for Web Page

Navigate the command prompt to the directory of the apigateway folder

```bash
cd esd-ui/
```

```bash
npm install
```

## Running the Web Page

```bash
npm run serve
```

## Start up microservices 
Navigate the command prompt to the directory of the apigateway folder

```bash
cd apigateway
```
```bash
docker compose up
```

