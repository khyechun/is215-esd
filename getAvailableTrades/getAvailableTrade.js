const express = require("express");
const axios = require('axios')
const cors = require("cors");
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
const itemURL = 'http://item:8088/api/item_api/getItems'
const tradeURL = 'http://trade:8084/api/trade/tradeItems'
app.get("/api/get_available_trades", async (req, res) => {
  var items = req.query.items;
  items = items.split(",").join(", ")
  try {
    
    
    var data = JSON.stringify({query: `mutation {
        tradeItems(items: [${items}]) {
          _id
          steamId
          status
          offerItems
          receiveItems
        }
      
      }`})
      
     
    var trades = await axios.post(tradeURL, data, setHeader());
    console.log(trades)
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
        steamId: trades[i].steamId,
        offerItems: item[i].offer,
        receiveItems: item[i].receive,
        status: trades[i].status,
        tradeId: trades[i]._id
      });

      
    }

    // AMQP THINGS: TODO
    res.status(200).send(result);
    await connect_kafka.connect('activity', `User has searched for ${items}. Time: ${new Date().toString()}`) 
    
    
  } catch (err) {
    res.status(404).send({message: 'No trades found', statusCode: 404})
    await connect_kafka.connect('error', `${items} dont have any trades found. Time: ${new Date().toString()}`) 
    
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
