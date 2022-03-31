import pika 

hostname = "localhost"
port = 8086

connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        host = hostname, port=port,
        heartbeat=3600, blocked_connection_timeout=3600,
    )
)

channel = connection.channel()


# Setting up of exchange 
exchangeName = "order_topic"
exchangeType = "topic"
channel.exchange_declare(exchange=exchangeName, exchange_type=exchangeType, durable=True)

### User Login Error Queue ### 

queue_name = "user_login_error"
channel.queue_declare(queue=queue_name, durable=True)

channel.queue_bind(exchange=exchangeName, queue=queue_name, routing_key='*.error')


### User Login Activity ###
queue_name = "user_login_activity"
channel.queue_declare(queue=queue_name, durable=True)

channel.queue_bind(exchange=exchangeName, queue=queue_name, routing_key='#')

### update User Info error queue ###
###  update User Info activity queue ###

### Get Items error queue ###
### Get Items Activity queue ###

### Get Available Trades error queue ###
### Get Available Trades Activity queue ###

### List Trades Error Queue ###
### List Trades Activity Queue ###

### Get Trades Error Queue ###
### Get Trades Activity Queue ###

### Resolve Trade Error Queue ###
### Resolve Trades Activity Queue ###


