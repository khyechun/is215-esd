const {Kafka} = require("kafkajs")
var kafka = {}

kafka.produceActivity = async function(data){
    const kafka = new Kafka({
        clientId: "player-jersey-1",
        brokers: ["127.0.0.1:9092"],
    });

    //const jerseyNumber = process.argv[2];

    const producer = kafka.producer();
    await producer.connect();
    console.log("Producer connected");

    const producedData = await producer.send({
        topic: "activity",
        messages: [
            {
                //value: players[jerseyNumber],
                value: data,
                //partition: jerseyNumber <= 10 ? 0 : 1,
            },
        ],
    });
    return producedData
    console.log(`Produced data ${JSON.stringify(producedData)}`);
}

kafka.produceError = async function(data){
    const kafka = new Kafka({
        clientId: "player-jersey-1",
        brokers: ["127.0.0.1:9092"],
    });

    //const jerseyNumber = process.argv[2];

    const producer = kafka.producer();
    await producer.connect();
    console.log("Producer connected");

    const producedData = await producer.send({
        topic: "error",
        messages: [
            {
                //value: players[jerseyNumber],
                value: data,
                //partition: jerseyNumber <= 10 ? 0 : 1,
            },
        ],
    });
    return producedData
    console.log(`Produced data ${JSON.stringify(producedData)}`);

}


export default kafka;