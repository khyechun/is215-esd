const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
const Trade = require("./model/trade")
const bodyParser = require('body-parser')

const app = express();
var jsonParser = bodyParser.json()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    next()
})

app.get("/trade", async (req, res)=>{
    
    try {
        const trades = await Trade.find();
        console.log(trades)
        res.status(200).json({trades})

    } catch (err) {
        console.log(err);
    }
})

app.get("/trade/items", async (req, res)=>{
    const items = req.query.items.split("_");
    try {
        var selectedTrades = []
        const trades = await Trade.find();
        for (trade of trades){
            var offer = trade.offerItems;
            var receive = trade.receieveItems;
            var status = true;
            for (item of items){
                if (!offer.includes(item) || !offer.includes(item)){
                    status = false;
                    break
                }
                
            }
            if (status){
                selectedTrades.push(trade)
            }
        }

        res.status(200).json({trades: selectedTrades})
        

    } catch (err) {
        console.log(err);
    }
})  

app.get("/trade/users", async (req, res)=>{
    const userId = req.query.id;
    try {
        
        const trades = await Trade.find({ "userId" : userId });
        
        res.status(200).json({trades})
        

    } catch (err) {
        console.log(err);
    }
})

app.post("/trade/new_trade", async (req, res)=>{
    const {receiveItems, offerItems, userId} = req.body;
    try {
        
        const trades = await Trade.insertMany({ userId, receiveItems, offerItems, "status": false })
        res.status(201).json({message: "Success"})
        

    } catch (err) {
        res.status(400).json({message: "Failed"})
        console.log(err);
    }
    
})

app.post("/trade/update", async (req, res)=>{
    const {tradeID} = req.body;
    try {
        
        const trade = await Trade.find({ "_id": tradeID })
        const filter = { "_id":userId };
        const update = { "userId":trade.userId, "receiveItems":trade.receieveItems, "offerItems":trade.offerItems, "status": true };
        let result = await Trade.findOneAndUpdate(filter, update);
        res.status(200).json({message: "Success"})
        

    } catch (err) {
        console.log(err);
    }
})



const url = require("./database").url
mongoose.connect(url, {useUnifiedTopology: true,  useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

app.listen(process.env.PORT || 8085, console.log("Running this app on 8085"))