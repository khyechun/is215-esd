const express = require('express');
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')
const {errorName} = require('./constants')
const {errorType} = require('./constants')
const getErrorCode = errorName =>{
    return errorType[errorName]
}

const mongoose = require("mongoose");
const Trade = require("./model/trade")
const bodyParser = require('body-parser');

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    
    
    next()
})

app.use('/api/trade', (req,res)=>{

 graphqlHTTP({
    schema: buildSchema(`
        type rootQuery {
            trades: [Trades]
            
        }

        type mutationQuery {
            createTrade(trade: Trade): String
            tradeItems(items: [Float]): [Trades]
        }

        input Trade {
            receiveItems: [Float]
            offerItems: [Float]
            steamId: String
        }

        type Trades {
            _id: String
            offerItems: [Float]
            steamId: String
            receiveItems: [Float]
            status: Boolean
            
        }

        schema {
            query: rootQuery
            mutation: mutationQuery
        }
    `),
    rootValue: {
        trades: async ()=>{
            
            try {
                
                var trades = await Trade.find();
                
                var new_trades = []
                for (var trade of trades){
                    
                    new_trades.push({_id: trade._id, steamId: trade.userId, offerItems: trade.offerItems, receiveItems: trade.receiveItems, status: trade.status})
                }
                console.log(new_trades)
                if (new_trades.length == 0){
                    throw new Error(errorName.NOTRADES)
                }
                return new_trades
                
                
                
                
        
            } catch (err) {
                console.log(err)
                
            }
            
        },
        tradeItems: async (args)=>{
            
            const {items} = args;
            console.log(items)
            try {
                var selectedTrades = []
                const trades = await Trade.find();
                for (var trade of trades){
                    
                    var offer = trade.offerItems;
                    var receive = trade.receiveItems;
                    console.log(receive)
                    var status = false;
                    
                    for (let item of items){
                        
                        if (offer.includes(item) || receive.includes(item)){
                            status = true;
                            break
                        }
                        
                    }
                    if (status){
                        selectedTrades.push({_id: trade._id, steamId: trade.userId, offerItems: trade.offerItems, receiveItems: trade.receiveItems, status: trade.status})
                    }
                }
                if (selectedTrades.length == 0){
                    throw new Error(errorName.NOTRADES)
                }
                
                return selectedTrades
                
        
            } catch (err) {
                console.log(err);
                throw new Error(errorName.NOTRADES)
            }
        },
        createTrade: async (args)=>{
            console.log(args)
            const {receiveItems, offerItems, steamId} = args.trade;
            console.log(steamId)
            try {
                
                const trades = await Trade.insertMany({ userId:steamId, receiveItems, offerItems, "status": false })
                console.log(steamId)
                return trades[0]._id
                

            } catch (err) {
                
                console.log(err);
                throw new Error(errorName.CREATETRADE)
            }
        }
    },
    graphiql: true,
    customFormatErrorFn: (err)=>{
        
        const error = getErrorCode(err.message);
        
        try {
            res.status(500).send({ message: "WRONG"})
        }catch(err){
            res.status(500).send({ message: error.message, statusCode: error.statusCode})
        }
        
    }
    
    })(req, res)
});




const url = require("./database").url
mongoose.connect(url, {useUnifiedTopology: true,  useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

app.listen(process.env.PORT || 8084, console.log("Running this app on 8084"))