const express = require("express");
const app = express();
const amqp = require("amqplib");
var channel, connection;



async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("error");

        channel.consume("error", data => {
            console.log(`Receieved ${Buffer.from(data.content)}`)
        })
    } catch (err) {
        console.log(err)
    }
}

connect()

app.listen(5004, () => {
    console.log("Server listening at 5004")
})

