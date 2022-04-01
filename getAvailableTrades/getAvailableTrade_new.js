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
  var items = req.query.items;
  items = items.split(",").join(", ")
  try {
    
    
    var data = JSON.stringify({query: `mutation {
        tradeItems(items: ${items}]) {
          _id
          steamId
          status
          offerItems
          receiveItems
        }
      
      }`})
      
     
    var trades = await axios.post(tradeURL, data, setHeader());
    var trades = trades.data.data.tradeItems
    console.log(trades)
    var query_arr = [];
    for (var trade of trades) {
      var offer = trade.offerItems;
      var receive = trade.receiveItems;
      offer = offer.join(".");
      receive = receive.join(".");
      var trade_query = offer + "," + receive;
      query_arr.push(trade_query);
    }
    var query = query_arr.join("|"); 
    var url = itemURL + `?arr=${query}`;
    /* var url = "http://localhost:8088/api/item_api/getItems?arr=1965347148.638245050,3113472303.4114517977" */
    var data = await axios.get(url, setHeader());
    var item = data.data.items;
    console.log(data.data)
    var result = [];
    for (let i = 0; i < item.length; i++) {
        
      result.push({
        steamId: trades[i].steamID,
        offerItems: item[i].offer,
        receiveItems: item[i].receive,
        status: trades[i].status,
        tradeId: trades[i]._id
      });

      
    }

    // AMQP THINGS: TODO
    /* const activity = await kafka.produceActivity(`${steamId} has placed a trade offer.`) */
    /* 
        await amqp_function.connect("activity") */
    res.status(200).send(result);
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
