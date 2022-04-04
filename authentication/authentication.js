const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const app = express();  


const authenticate_api = require('./authenticate_api');



app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/authenticate_api', authenticate_api);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const port = process.env.PORT || '8082';
app.set('port', port);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://localhost:8080"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// Create HTTP server
const server = http.createServer(app);


server.listen(port, () => console.log(`One step closer to dropping out! localhost:${port}`));

exports.server = server;


app.get('*', (req, res) => { 
  res.sendFile(__dirname + '/index.html');
});


