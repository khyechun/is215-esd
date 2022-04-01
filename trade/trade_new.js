const express = require('express');

const cors = require('cors')

const bodyParser = require('body-parser');

const app = express();  
const Trade = require("./model/trade")
const mongoose = require("mongoose");

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/trade/getAllTrades', async (req, res)=>{
    try {
                
        var trades = await Trade.find();
        
        var new_trades = []
        for (var trade of trades){
            
            new_trades.push({_id: trade._id, steamId: trade.userId, offerItems: trade.offerItems, receiveItems: trade.receiveItems, status: trade.status})
        }
        
        res.status(200).send(new_trades)
        
        
        
        

    } catch (err) {
        console.log(err)
        res.status(404).send("No trades found")
    }
    
})

app.get('/api/trade/tradeItems', async (req, res)=>{
    var items = req.query.items;
    var item_array = items.split(",")
    try {
        var selectedTrades = []
        const trades = await Trade.find();
        for (var trade of trades){
            
            var offer = trade.offerItems;
            var receive = trade.receiveItems;
            console.log(receive)
            var status = false;
            
            for (let item of item_array){
                
                if (offer.includes(item) || receive.includes(item)){
                    status = true;
                    break
                }
                
            }
            if (status){
                selectedTrades.push({_id: trade._id, userId: trade.userId, offerItems: trade.offerItems, receiveItems: trade.receiveItems, status: trade.status})
            }
        }
        res.status(200).send(selectedTrades)
        
    } catch(err){
        res.status(404).send("No trades found")
    }
})

app.post('/api/trade/createTrade', async (req, res)=>{
    const {receiveItems, offerItems, steamId} = req.body;
            
    try {
        
        const trades = await Trade.insertMany({ userId:steamId, receiveItems, offerItems, "status": false })
        res.status(201).send(true)
        

    } catch (err) {
        
        console.log(err);
        res.status(500).send("Error creating trade")
    }
})


const url = require("./database").url
mongoose.connect(url, {useUnifiedTopology: true,  useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

app.listen(process.env.PORT || 8085, console.log("Running this app on 8085"))



