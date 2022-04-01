// Docker Image for rabbitMQ = docker run --name rabbitmq -p 15672:15672 rabbitmq:3-management


const amqp_function = require("./rabbitMQ_AMQP_Setup")

var data = {
    "name" : "testing456"
}

async function testing2(){
    console.log("connecting...")
    await amqp_function.connect("error")
    await amqp_function.connect("activity")
    await amqp_function.connect("email")

    
    await amqp_function.sendData("error", data)
   await amqp_function.sendData("activity", data)
   await amqp_function.sendData("email", data)

}


testing2()
