//Consumer - activity - Port 5003

var nodemailer = require('nodemailer'); 
const express = require("express");
const app = express();
const amqplib = require("amqplib");
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

async function connect() {
  try {
    const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
    const channel = await connection.createChannel();
    await channel.assertQueue("email");

    channel.consume("email", (data) => {
      var buffer = Buffer.from(data.content)
      //console.log(JSON.stringify(buffer.toString()).email);
      console.log(JSON.parse(buffer.toString()).email)
      var object = JSON.parse(buffer.toString())

      
      //console.log(buffer)
      //1. retrieve steamID AND TRADE IT from complex microservice
      if (object.email){
        let userEmail = object.email;
        
      

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "hosehtrades@gmail.com",
            pass: "lyhuroxfxmwrmzbh",
          },
        });
  
        var mailOptions = {
          from: "hosehtrade@gmail.com",
          to: userEmail,
          subject: "Request for reset of password",
          html: `
          <h1> ${object.tradeID} has been successfully listed </h1>
          `,
        };
  
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            
            console.log("Email sent: " + info.response);
          }
        });
      } 

    });
  } catch (err) {
        console.log(err);
  }
}

connect();
