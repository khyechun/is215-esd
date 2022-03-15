const express = require('express');
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')

const mongoose = require("mongoose");
const Trade = require("./model/trade")
const bodyParser = require('body-parser');
const trade = require('./model/trade');

const app = express();
var jsonParser = bodyParser.json()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    next()
})

app.use('/graphql', graphqlHTTP({
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
            userId: Int
        }

        type Trades {
            _id: String
            offerItems: [Int]
            userId: Int
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
                    
                    new_trades.push({_id: trade._id, userId: trade.userId, offerItems: trade.offerItems, receiveItems: trade.receiveItems, status: trade.status})
                }
                console.log(new_trades)
                return new_trades
                
                
        
            } catch (err) {
                console.log(err);
                return "Failed";
            }
            
        },
        tradeItems: async (args)=>{
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
            const {receiveItems, offerItems, userId} = args.trade;
            console.log(userId)
            try {
                
                const trades = await Trade.insertMany({ userId, receiveItems, offerItems, "status": false })
                return true
                

            } catch (err) {
                
                console.log(err);
                return false
            }
        }
    },
    graphiql: true
}));



/* app.get("/trade/users", async (req, res)=>{
    const userId = req.query.id;
    try {
        
        const trades = await Trade.find({ "userId" : userId });
        
        res.status(200).json({trades})
        

    } catch (err) {
        console.log(err);
    }
}) */



/* app.post("/trade/update", async (req, res)=>{
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
}) */



const url = require("./database").url
mongoose.connect(url, {useUnifiedTopology: true,  useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

app.listen(process.env.PORT || 8085, console.log("Running this app on 8085"))