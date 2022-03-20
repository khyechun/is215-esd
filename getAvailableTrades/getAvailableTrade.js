const express = require('express');
const cors = require('cors')
const axios = require('axios')
const http = require('http')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')

const bodyParser = require('body-parser');
const trade = require('../trade/model/trade');


const app = express();
var jsonParser = bodyParser.json()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    
    next()
})

const itemURL = 'http://localhost:8088/getItems'
const tradeURL = 'http://localhost:8085/api/trade'

app.use('/api/get_available_trades', graphqlHTTP({
    schema: buildSchema(`
        type rootQuery {
            getTrades(items: [Int]): [Trades]
        }

        type mutationQuery {
            createTrade(items: [Int]): [Trades]
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
                var trades = await axios.get(url, setHeader());
                
        
            } catch (err) {
                console.log(err)
                return "Failed";
            }
            
        },
        
    },
    graphiql: true
}));

const setHeader = ()=>{
    return {
      headers:{
                'Content-Type': 'application/json'
              }
    }
}

app.listen(process.env.PORT || 8093, console.log("Running this app on 8085"))