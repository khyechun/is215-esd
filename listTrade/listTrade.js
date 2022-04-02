const express = require("express");
const axios = require('axios')
const cors = require("cors");
const connect_amqp = require("../rabbitMQ_AMQP/rabbitMQ_AMQP_Setup")

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
          offerItems: [${offerItems.join(", ")}], steamId: ${steamId}}) 
          }`})
        console.log(data)
        var status = await axios.post(tradeURL, data, setHeader());
        
        
        // AMQP THINGS: TO DO
        /* const activity = await kafka.produceActivity(`${steamId} has placed a trade offer.`) */
        /* var data = {email: "HEHHEHE", tradeID: status.data._id}
        await amqp_function.connect("email", data) */
        res.statusCode = 201
        res.status(201).send({status:true})
        // res.send({status:true})
        
        

    } catch (err) {
        /* const activity = await kafka.produceError(`ERROR`) */
        console.log(err)
        
        
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
