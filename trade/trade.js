const express = require('express');
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')

const mongoose = require("mongoose");
const Trade = require("./model/trade")
const bodyParser = require('body-parser');

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Acess-Control-Allow-Methods', 'POST, GET')
    next()
})

app.use('/api/trade', graphqlHTTP({
    schema: buildSchema(`
        type rootQuery {
            trades: [Trades]
            
        }

        type mutationQuery {
            createTrade(trade: Trade): Boolean
            tradeItems(items: [Int]): [Trades]
        }

        input Trade {
            receiveItems: [Int]
            offerItems: [Int]
            steamId: Int
        }

        type Trades {
            _id: String
            offerItems: [Int]
            steamId: Int
            receiveItems: [Int]
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
                return new_trades
                
                
        
            } catch (err) {
                console.log(err);
                return "Failed";
            }
            
        },
        tradeItems: async (args)=>{
            console.log("HI")
            const {items} = args;
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
                        selectedTrades.push({_id: trade._id, userId: trade.userId, offerItems: trade.offerItems, receiveItems: trade.receiveItems, status: trade.status})
                    }
                }
                console.log(selectedTrades)
                return selectedTrades
                
        
            } catch (err) {
                console.log(err);
            }
        },
        createTrade: async (args)=>{
            console.log(args)
            const {receiveItems, offerItems, steamId} = args.trade;
            console.log(userId)
            try {
                
                const trades = await Trade.insertMany({ steamId, receiveItems, offerItems, "status": false })
                return true
                

            } catch (err) {
                
                console.log(err);
                return false
            }
        }
    },
    graphiql: true
}));




const url = require("./database").url
mongoose.connect(url, {useUnifiedTopology: true,  useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

app.listen(process.env.PORT || 8085, console.log("Running this app on 8085"))