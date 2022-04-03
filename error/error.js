const { Kafka } = require("kafkajs");

async function consume() {
    const kafka = new Kafka({
        clientId: "X-consumer",
        brokers: ["kafka:9092"],
    });

    const consumer = kafka.consumer({ groupId: "X-Error" });
    await consumer.connect();
    console.log("Consumer connected");

    await consumer.subscribe({
        topic: "error",
        fromBeginning: true,
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // 1. topic
            // 2. partition
            // 3. message

            console.log(
                `To Partition ${partition} -> message ${message.value.toString()}`
            );
            
        },
    });
}

consume();