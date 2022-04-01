const express = require('express');
const cors = require('cors')
const axios = require('axios')
const http = require('http')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')


const kafka = require("./kafka")
const bodyParser = require('body-parser');



const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next()
})

const itemURL = 'http://localhost:8088/api/item_api/getAllItems'


app.get("/api/getItems", (req,res)=>{
    var gameId = req.query.gameId
    var url = itemURL + "?gameId=" + gameId;
    try {
        var items = await axios.get(url, setHeader());
        const activity = await kafka.produceActivity(`${steamId} has placed a trade offer.`)
        res.status(200).send(items.data)
    } catch (error) {
        const activity = await kafka.produceError(`ERROR`)
    }
    
})

const setHeader = ()=>{
    return {
      headers:{
                'Content-Type': 'application/json'
              }
    }
}

app.listen(process.env.PORT || 8094, console.log("Running this app on 8094"))