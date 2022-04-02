const { Kafka } = require("kafkajs");

async function produce() {
    const kafka = new Kafka({
        clientId: "X-Producer",
        brokers: ["localhost:9092"],
    });

    //const jerseyNumber = process.argv[2];

    const producer = kafka.producer();
    await producer.connect();
    console.log("Producer connected");



    const producedData = await producer.send({
        topic: "123",
        messages: [
            {
                //value: players[jerseyNumber],
                value: "2 april 2022",
                //partition: jerseyNumber <= 10 ? 0 : 1,
            },
        ],
    });
    // const producedDatas = await producer.send({
    //     topic: "Error",
    //     messages: [
    //         {
    //             //value: players[jerseyNumber],
    //             value: "Error123",
    //             //partition: jerseyNumber <= 10 ? 0 : 1,
    //         },
    //     ],
    // });
    console.log(`Produced data ${JSON.stringify(producedData)}`);
}

produce();