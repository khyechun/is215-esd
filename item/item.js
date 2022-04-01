const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();  


const item_api = require('./item_api');


app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    
    
    next()
})
app.use('/api/item_api', item_api);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const port = process.env.PORT || '8088';
app.set('port', port);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const url = "mongodb+srv://admin:4azF5gfOoIR8hQ3P@itemdb.rwiet.mongodb.net/itemDB?retryWrites=true&w=majority"
mongoose.connect(url, {useUnifiedTopology: true,  useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})


// Create HTTP server
const server = http.createServer(app);


server.listen(port, () => console.log(`One step closer to dropping out! localhost:${port}`));

exports.server = server;



