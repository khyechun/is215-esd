const express = require("express");
const axios = require('axios')
const cors = require("cors");

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

const tradeURL = 'http://localhost:8085/api/trade/createTrade'

app.post("/api/list_trade", async (req, res) => {
    const {receiveItems, offerItems} = req.body;
    
    console.log(req.body)
    try {
        /* var res = await axios.get(authenticateURL, setHeader(token));
        var steamId = res.userId */
        
        var steamId = 76561198000003391
        var data = JSON.stringify({query: `mutation{
            createTrade(trade: {receiveItems: [${receiveItems.join(", ")}],
          offerItems: [${receiveItems.join(", ")}], steamId: ${steamId}}) 
          }`})
        console.log(data)
        var status = await axios.post(tradeURL, data, setHeader());
        console.log(status)
        /* const activity = await kafka.produceActivity(`${steamId} has placed a trade offer.`) */
        
        res.statusCode = 201
        res.status(201).send({status:true})
        
        

    } catch (err) {
        /* const activity = await kafka.produceError(`ERROR`) */
        console.log(err)
        
        
    }
});

const setHeader = ()=>{
    return {
      headers:{
                'Content-Type': 'application/json'
              }
    }
}


app.listen(process.env.PORT || 8092, console.log("Running this app on 8092"));
