const express = require('express');
const cors = require('cors')
const axios = require('axios')
const http = require('http')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')
const {errorName} = require('./constants')
const {errorType} = require('./constants')

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

app.use('/api/list_trade', (req,res)=>{
    graphqlHTTP({
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
                    res.statusCode = 201
                    res.send(true)
                    
                    
            
                } catch (err) {
                    
                    throw new Error(errorName.CREATETRADE)
                }
                
            },
            
        },
        graphiql: true,
        customFormatErrorFn: (err)=>{
            
            const error = getErrorCode(err.message);
            /* return { message: error.message, statusCode: error.statusCode} */
            try {
                res.status(500).send({ message: error.message, statusCode: error.statusCode})
            }catch(err){
                res.status(500).send({ message: error.message, statusCode: error.statusCode})
            }
            
        }
    })(req,res)
});

const setHeader = (token)=>{
    return {
      headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              }
    }
}

app.listen(process.env.PORT || 8092, console.log("Running this app on 8085"))