import json 
from kafka import KafkaConsumer

if __name__ == "__main__":
    consumer = KafkaConsumer(
        'error',
        bootstrap_servers = 'kafka:9092',
        auto_offset_reset='earliest',
        api_version=(0,10,1)
    )

    for message in consumer: 
        print(message.value)