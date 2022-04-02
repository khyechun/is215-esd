const kafka_function = require("./kafka_setup")

var data = {
    "TestData" : "Testing Kafka",
}

async function testing(){
    console.log("Connecting...")
    await kafka_function.connect("123", Buffer.from(JSON.stringify(data)));
    await kafka_function.connect("error", Buffer.from(JSON.stringify(data)));
    await kafka_function.connect("activity", Buffer.from(JSON.stringify(data)));
}

testing()