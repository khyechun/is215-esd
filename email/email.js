const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore');



const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();  


const serviceAccount = require('./ServiceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});


const db = getFirestore();
exports.db = getFirestore();


const email_api = require('./email_api');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/email_api', email_api);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const port = process.env.PORT || '8085';
app.set('port', port);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:8085"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Create HTTP server
const server = http.createServer(app);

server.listen(port, () => console.log(`One step closer to dropping out! localhost:${port}`));

exports.server = server;



