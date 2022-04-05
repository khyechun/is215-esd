# HosehTrades


**Steam** is a video game digital distribution service and storefront developed by Valve. It is a one stop platform for users to play, discuss and create new games. It is currently one of the most popular gaming platforms, boasting over 25 million monthly active users. Despite being one of the biggest gaming platforms, we realised that there was no **dedicated feature/platform** within Steam for users to trade in-game items with one another.

Therefore, we have decided to develop HosehTrades, a one stop platform that facilitates trading of Steam items between users. In addition, to prevent bots from using our website, all users must be authenticated with their Steam account before being allowed to post a trade on our platform. The following are the 3 user scenarios we will be covering:


## Start up the microservices 
Navigate the command prompt to the directory of the apigateway folder

```bash
cd apigateway/
```
Running the docker-compose.yml

```bash
docker compose up
```

****

## Installation for Web Page

Navigate the command prompt to the directory of esd-ui folder

```bash
cd esd-ui/
```
Install the relevant dependencies

```bash
npm install
```

## Running the Web Page

```bash
npm run serve
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

## Kong Gateway Step-by-Step Configuration 

1.	Head over to Konga(http://localhost:1337), create an account and sign in. Connect Konga to Kong by creating a new connection
  - Name: default
  - Kong Admin URL: http://kong:8001
 
2.	Set up the routes for the complex microservices: 
  - a.	 getItems -> Port 8094
  - b.	listTrade -> Port 8092
  - c.	getAvailableTrades -> Port 8093
  - d.	userLogin -> Port 8090

3.	The service route for getItems at Konga is as below: 
![getItems (routes)](https://user-images.githubusercontent.com/89075648/161686654-cffc57f9-6771-4f65-9671-c79065df44fb.png)



4. The Service route for ListTrade at Konga is shown below: 

![listtrade (service)](https://user-images.githubusercontent.com/89075648/161686365-28c9a43e-2dbe-4921-8265-c11e9d857dcd.png)


![listtrade (route)](https://user-images.githubusercontent.com/89075648/161686369-3435380b-3b48-4558-951c-b5b7e2baeb3e.png)



5. The service route for getAvailableTrades at Konga is as below: 
![getavailabletrade(service)](https://user-images.githubusercontent.com/89075648/161686441-fbf1c95f-6912-47b2-8a33-78f276d55f38.png)

![getavailabletrade(route)](https://user-images.githubusercontent.com/89075648/161686450-85d62700-e24a-40cb-8703-a8b4d926756d.png)


6. The Service route for userLogin at Konga is shown below: 
![userLogin (service)](https://user-images.githubusercontent.com/89075648/161686516-e8f27529-be7a-47a6-95e0-32043c75b504.png)

![userLogin (route)](https://user-images.githubusercontent.com/89075648/161686528-6f1c1e23-1681-41a1-a468-a86b6935254d.png)


7. Having set up the configurations for the various service routes for the complex microservice, it is crucial that we also add a global plugin: Cors. 

![cors](https://user-images.githubusercontent.com/89075648/161686598-2be9319b-0099-452b-8f1d-20daeb25bb99.png)



