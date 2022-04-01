//Consumer - activity - Port 5003

var nodemailer = require('nodemailer'); 
const express = require("express");
const app = express();
const amqp = require("amqplib");
var channel, connection;

async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("email");

    channel.consume("email", (data) => {
      //1. retrieve steamID AND TRADE IT from complex microservice
      /* const {email, tradeID} = data; */
      let userEmail = "cnjk0605@gmail.com";
      let userID = "1234567";

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
        <h1> Test </h1>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send("email send successfully");
          console.log("Email sent: " + info.response);
        }
      });
    });
  } catch (err) {
        console.log(err);
  }
}

connect();
