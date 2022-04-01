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
const itemURL = 'http://localhost:8088/api/item_api/getItems'
const tradeURL = 'http://localhost:8085/api/trade/tradeItems'
app.get("/api/get_available_trades", async (req, res) => {
    const {receiveItems, offerItems, token} = req.body;
    console.log(receiveItems)
    console.log(offerItems)
    try {
        var res = await axios.get(authenticateURL, setHeader(token));
        var steamId = res.userId
        
        var steamId = 76561198000003391
        var data = JSON.stringify({query: `query{
            trades {
                _id: String
                offerItems
                steamId
                receiveItems
                status
            }
          }`})
        console.log(data)
        var status = await axios.post(tradeURL, data, setHeader());
        console.log(status)
        /* const activity = await kafka.produceActivity(`${steamId} has placed a trade offer.`) */
        
        res.statusCode = 201
        res.json({status:true})
        
        

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


app.listen(process.env.PORT || 8093, console.log("Running this app on 8093"));
