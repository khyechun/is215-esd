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


const tradeURL = 'http://localhost:8085/api/trade';
const authenticateURL = 'http://localhost:8082/api/authenticate_api/authenticateToken'

app.use('/api/list_trade', graphqlHTTP({
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
            tokenId: String
        }

        

        schema {
            query: rootQuery
            mutation: mutationQuery
        }
    `),
    rootValue: {
        createTrade: async (args)=>{
            const {items} = args;
            const {receiveItems, offerItems, token} = args.trade;
            try {
                var res = await axios.get(authenticateURL, setHeader(token));
                var steamId = res.userId
                var data = JSON.stringify({query: `mutation {
                    createTrade(receiveItems: ${receiveItems}, offerItems: ${offerItems}, steamId: ${steamId})
                  }`})
                  
                var status = await axios.post(tradeURL, data, setHeader());
                return status.data.data.createTrade
                
                
        
            } catch (err) {
                console.log(err)
                return false;
            }
            
        },
        
    },
    graphiql: true
}));

const setHeader = (token)=>{
    return {
      headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              }
    }
}

app.listen(process.env.PORT || 8092, console.log("Running this app on 8085"))