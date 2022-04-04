const express = require("express");
const axios = require('axios')
const cors = require("cors");
const connect_amqp = require("./rabbitMQ_AMQP_Setup")
const connect_kafka = require("./kafka_setup")

const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tradeURL = 'http://trade:8084/api/trade/createTrade'
const authenticateURL = "http://authentication:8082/api/authenticate_api/authenticateToken"
const emailURL = "http://user:8081/api/user_api/getUserEmail"
app.post("/api/list_trade", async (req, res) => {
    /* const {receiveItems, offerItems} = req.body; */
    const {receiveItems, offerItems, token} = req.body;
    console.log(req.body)
    try {
        var response = await axios.get(authenticateURL, setHeader(token));
        console.log(response.data)
        var steamId = response.data.token_object.userId

        if(steamId == undefined){
            res.status(200).send({statusCode: 200, message:"User must be logged in"})    
            return 
        }
        
        if(offerItems.length == 0 || offerItems.length == 0){
            res.status(200).send({statusCode: 200, message:"Please select both items you are offering and receiving"})
            return 
        }

        
        /* var steamId = 76561198000003391 */
        var data = JSON.stringify({query: `mutation{
            createTrade(trade: {receiveItems: [${receiveItems.join(", ")}],
          offerItems: [${offerItems.join(", ")}], steamId: "${steamId}"}) 
          }`})
        
        var status = await axios.post(tradeURL, data, setHeader());
        res.statusCode = 201
        res.status(201).send({status:true})
        
        // AMQP THINGS: TO DO
        await connect_kafka.connect('activity', `${steamId} has placed a trade offer with trade ID ${status.data.data.createTrade}. Time: ${new Date().toString()}`) 
        var response = await axios.get(emailURL + `?id=${steamId}`, setHeader(token));
        console.log(response.data)
        var data = {email: response.data.email, tradeID: status.data.data.createTrade}
        
        console.log(data)
        await connect_amqp.connect("Email", data)
                

    } catch (err) {
        res.status(500).send({message: 'Error creating trade', statusCode: 500})
        await connect_kafka.connect('error', `${steamId} has an issue creating a trade. Time: ${new Date().toString()}`) 
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
