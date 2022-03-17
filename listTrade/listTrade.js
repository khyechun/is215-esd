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


const tradeURL = 'http://localhost:8085/graphql'

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type rootQuery {
            getTrades(items: [Int]): [Trades]
        }

        type mutationQuery {
            createTrade(trade: Trade): Boolean
        }

        input Trade {
            receiveItems: [Int]
            offerItems: [Int]
            userId: Int
        }

        

        schema {
            query: rootQuery
            mutation: mutationQuery
        }
    `),
    rootValue: {
        getTrades: async (args)=>{
            const {items} = args;
            const {receiveItems, offerItems, userId} = args.trade;
            try {
                var data = JSON.stringify({query: `mutation {
                    createTrade(receiveItems: ${receiveItems}, offerItems: ${offerItems}, userId: ${userId})
                  
                  }`})
                  
                var trades = await axios.post(tradeURL, data, setHeader());
                return trades.data.data.tradeItems
                
                
        
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

app.listen(process.env.PORT || 8092, console.log("Running this app on 8085"))