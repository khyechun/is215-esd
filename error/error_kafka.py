import json 
from kafka import KafkaConsumer

if __name__ == "__main__":
    consumer = KafkaConsumer(
        'error',
        bootstrap_servers = 'localhost:9092',
        auto_offset_reset='earliest'
    )

    for message in consumer: 
        print(message.value)