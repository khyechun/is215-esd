//Producer 

const express = require("express");
const app = express();
const amqp = require("amqplib");
var channel, connection;

connect()
async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        // Need to change the queue name to Error or Activity 
        await channel.assertQueue("error");


    } catch (err) {
        console.log(err)
    }
}

// Putting in data here
app.get("/send", async (req, res) => {
    const fakedata = {
        name: "Caleb",
        sex: "Male",
        time: Date.now()
    };

    await channel.sendToQueue("error", Buffer.from(JSON.stringify(fakedata)));
    //await channel.close();
    //await connection.close();
    return res.send("Done");
});

app.listen(5001, () => {
    console.log("PRODUCER - Server listening at 5001");
});
