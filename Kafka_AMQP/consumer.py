import json 
from kafka import KafkaConsumer

if __name__ == "__main__":
    consumer = KafkaConsumer(
        'jersey1',
        bootstrap_servers = 'localhost:9092',
        auto_offset_reset='earliest'
    )

    for message in consumer: 
        print("HI")
        print(message.value)
        """ print(json.loads(message.value)) """