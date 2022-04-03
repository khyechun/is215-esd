//const express = require('express');
//const app = express();
//for rabbitMQ

const amqp= require("amqplib");
var connect_amqp = {};
var channel;



connect_amqp.connect = async function(name, data){
    try {
        console.log(data)
        const amqpServer = "amqp://rabbitmq:5672";
        const connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue(name);
        await channel.sendToQueue(name, Buffer.from(JSON.stringify(data)));
        
        // channel.assertExchange("email_topic", 'topic', {durable: true});
        // channel.publish("email_topic", "user.error", Buffer.from(JSON.stringify(data)));


    } catch  (err) {
        console.log(err)
        console.log("There is an error sending the error message")
    }

}

/* connect_amqp.sendData = async function(queue,data){
    //console.log(channel)
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
} */


module.exports = connect_amqp