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

Navigate the command prompt to the directory of the apigateway/kong folder

```bash
cd apigateway/kong
```

Running the docker-compose.yml
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

****

## Start up the microservices 
Navigate the command prompt to the directory of the apigateway folder

```bash
cd apigateway
```
Running the docker-compose.yml
```bash
docker compose up
```


## Kong Gateway Step-by-Step Configuration 
1.	Run docker compose up at /is215-esd/apigateway/kong 
2.	Head over to Konga to set up the routes for the complex microservices: 
  a.	 getItems -> Port 8094
  b.	listTrade -> Port 8092
  c.	getAvailableTrades -> Port 8093
  d.	userLogin -> Port 8090
3.	The service route for getItems at Konga is as below: 
![image](https://user-images.githubusercontent.com/89075648/161684307-e78aafec-f58f-4751-a11d-040ee118a434.png)

![image](https://user-images.githubusercontent.com/89075648/161684430-b59aac4b-818c-4fac-9f07-5d0abe6ad554.png)


4. The Service route for ListTrade at Konga is shown below: 
![image](https://user-images.githubusercontent.com/89075648/161684485-8ce9fd95-8aba-48af-b0df-ead5e8060999.png)


![image](https://user-images.githubusercontent.com/89075648/161684504-4f191a40-2207-41f1-a29c-10e8aebf22a0.png)


5. The service route for getAvailableTrades at Konga is as below: 
![image](https://user-images.githubusercontent.com/89075648/161684566-9d649f81-ce5c-4b25-8002-fb361d2c664d.png)

![image](https://user-images.githubusercontent.com/89075648/161684588-14f099b9-beb8-492a-a7d3-1e33c36faee4.png)



6. The Service roite for userLogin at Konga is shown below: 
![image](https://user-images.githubusercontent.com/89075648/161684634-649b68f3-b5d5-4a9d-bb2d-73e6430a96f2.png)

![image](https://user-images.githubusercontent.com/89075648/161684656-8f3547a5-8279-41e1-bdbb-a88f9b80faae.png)

7. Having set up the configurations for the various service routes for the complex microservice, it is crucial that we also add a global plugin: Cors. 
![image](https://user-images.githubusercontent.com/89075648/161684766-8bda3ff6-974c-4c15-bd12-ca4b0b048dae.png)



