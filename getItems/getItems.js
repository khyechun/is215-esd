const express = require('express');
const cors = require('cors')
const axios = require('axios')
const connect_kafka = require("./kafka_setup")

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

const itemURL = 'http://item:8088/api/item_api/getAllItems/'


app.get("/api/getItems", async (req,res)=>{
    var gameId = req.query.gameId
    console.log(gameId)
    var url = itemURL + gameId;
    try {
        var items = await axios.get(url, setHeader());
        res.status(200).send(items.data)
        await connect_kafka.connect('activity', `Items retrieved for game ${gameId}`) 
        
    } catch (error) {
        res.status(404).send({message: 'No trades found', statusCode: 404})
        await connect_kafka.connect('error', `Items could not be retrieved for game ${gameId}`) 
        
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