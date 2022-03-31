const express = require('express');
const cors = require('cors')
const axios = require('axios')
const http = require('http')
const { Kafka } = require("kafkajs");
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')
const {errorName} = require('./constants')
const {errorType} = require('./constants')
const getErrorCode = errorName =>{
    return errorType[errorName]
}
const kafka = require("./kafka")
const bodyParser = require('body-parser');

const app = express();
var jsonParser = bodyParser.json()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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
                token: String
            }
    
            
    
            schema {
                query: rootQuery
                mutation: mutationQuery
            }
        `),
        rootValue: {
            createTrade: async (args)=>{
                
                const {receiveItems, offerItems, token} = args.trade;
                try {
                    var res = await axios.get(authenticateURL, setHeader(token));
                    var steamId = res.userId
                    var data = JSON.stringify({query: `mutation {
                        createTrade(receiveItems: ${receiveItems}, offerItems: ${offerItems}, steamId: ${steamId})
                      }`})
                      
                    var status = await axios.post(tradeURL, data, setHeader());
                    const activity = await kafka.produceActivity(`${steamId} has placed a trade offer.`)
                    
                    res.statusCode = 201
                    res.json({status:true})
                    
                    
            
                } catch (err) {
                    const activity = await kafka.produceError(`ERROR`)
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