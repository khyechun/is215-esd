const { Kafka } = require("kafkajs");
var connect_kafka = {};
var channel;
var producer;


connect_kafka.connect = async function(name, data){
    try {
        const kafka = new Kafka({
            clientId: "Producer",
            brokers: ["kafka:9092"]
        });

        producer = kafka.producer();
        await producer.connect();
        console.log("Producer connected")

        const produceData = await producer.send({
            topic: name,
            messages: [
                {
                    value: data
                },
            ],

        });

        console.log(`Produced data ${JSON.stringify(produceData)}`);

    } catch (err) {
        console.log(err);
    }
}

module.exports = connect_kafka