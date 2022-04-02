const express = require("express");
const axios = require('axios')
const cors = require("cors");
const connect_amqp = require("../rabbitMQ_AMQP/rabbitMQ_AMQP_Setup")
const connect_kafka = require("../Kafka_AMQP/kafka_setup")

const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    
    next()
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tradeURL = 'http://localhost:8084/api/trade/createTrade'
const authenticateURL = "http://localhost:8082/api/authenticate_api/authenticateToken"
const emailURL = "http://localhost:8081/api/user_api/getUserEmail"
app.post("/api/list_trade", async (req, res) => {
    /* const {receiveItems, offerItems} = req.body; */
    const {receiveItems, offerItems, token} = req.body;
    console.log(req.body)
    try {
        var response = await axios.get(authenticateURL, setHeader(token));
        console.log(response.data)
        var steamId = response.data.token_object.userId
        
        /* var steamId = 76561198000003391 */
        var data = JSON.stringify({query: `mutation{
            createTrade(trade: {receiveItems: [${receiveItems.join(", ")}],
          offerItems: [${offerItems.join(", ")}], steamId: ${String(steamId)}}) 
          }`})
        console.log(data)
        var status = await axios.post(tradeURL, data, setHeader());
        console.log(status.data)
        
        // AMQP THINGS: TO DO
        await connect_kafka.connect('activity', `${steamId} has placed a trade offer with trade ID ${status.data.data.createTrade}.`) 
        var response = await axios.get(emailURL + `?id=${steamId}`, setHeader(token));
        console.log(response.data)
        var data = {email: response.data.email, tradeID: status.data.data.createTrade}
        
        console.log(data)
        await connect_amqp.connect("email", data)
        res.statusCode = 201
        res.status(201).send({status:true})
        // res.send({status:true})
        
        

    } catch (err) {
        await connect_kafka.connect('error', `${steamId} has an issue creating a trade.`) 
        console.log(err)
        res.status(500).send({message: 'Error creating trade', statusCode: 500})
        
    }
});

const setHeader = (token)=>{
    return {
      headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
    }
}


app.listen(process.env.PORT || 8092, console.log("Running this app on 8092"));
