const express = require('express');
const cors = require('cors')
const axios = require('axios')
const http = require('http')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')
const {errorName} = require('./constants')
const {errorType} = require('./constants')

const bodyParser = require('body-parser');



const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    
    next()
})

const itemURL = 'http://localhost:8088/getItems'
const tradeURL = 'http://localhost:8085/api/trade'

app.use('/api/get_available_trades', (req, res)=>{
    graphqlHTTP({
        schema: buildSchema(`
            type rootQuery {
                getTrades(items: [Int]): [Trades]
            }
    
            type mutationQuery {
                createTrade(items: [Int]): [Trades]
            }
    
            type Trades {
                offerItems: [Item]
                steamId: Int
                receiveItems: [Item]
                status: Boolean
                
            }
    
            type Item {
                itemID: Int
                itemName: String
                icon_url: String
                rarity_colour: String
            }
    
            schema {
                query: rootQuery
                mutation: mutationQuery
            }
        `),
        rootValue: {
            getTrades: async (args)=>{
                const {items} = args;
                
                try {
                    var data = JSON.stringify({query: `mutation {
                        tradeItems(items: [11]) {
                          _id
                          steamId
                          status
                          offerItems
                          receiveItems
                        }
                      
                      }`})
                      
                    var data = await axios.post(tradeURL, data, setHeader());
                    var trades = data.data.data.tradeItems
                    var query_arr = []
                    for (var trade of trades){
                        var offer = trade.offerItems
                        var receive = trade.receiveItems
                        offer = offer.join(".")
                        receive = receive.join(".")
                        var trade_query = offer + "," + receive;
                        query_arr.push(trade_query)
                    }
                    var query = query_arr.join("|");
                    var url = itemURL + `?arr=${query}`
                    var data = await axios.get(url, setHeader());
                    var item = data.data;
                    var result = [];
                    for (let i=0; i<item.length; i++){
                        result.push({steamId: trades[i].steamId, offerItems:item[i].offer, receiveItems: item[i].receive, status: trades[i].status})
                    }
                    res.send(result)
            
                } catch (err) {
                    console.log(err)
                    throw new Error(errorName.NOTRADES)
                }
                
            },
            
        },
        graphiql: true,
        customFormatErrorFn: (err)=>{
            
            const error = getErrorCode(err.message);
            /* return { message: error.message, statusCode: error.statusCode} */
            try {
                res.status(404).send({ message: error.message, statusCode: error.statusCode})
            }catch(err){
                res.status(404).send({ message: error.message, statusCode: error.statusCode})
            }
            
        }
    })(req, res)
});

const setHeader = ()=>{
    return {
      headers:{
                'Content-Type': 'application/json'
              }
    }
}

app.listen(process.env.PORT || 8093, console.log("Running this app on 8085"))