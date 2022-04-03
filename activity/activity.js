const { Kafka } = require("kafkajs");

async function consume() {
    const kafka = new Kafka({
        clientId: "X-consumer",
        brokers: ["kafka:9092"],
    });

    const consumer = kafka.consumer({ groupId: "X-Activity" });
    await consumer.connect();
    console.log("Consumer connected");

    await consumer.subscribe({
        topic: "activity",
        fromBeginning: true,
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            console.log(
                `To Partition ${partition} -> message ${message.value.toString()}`
            );
            
        },
    });
}

consume();