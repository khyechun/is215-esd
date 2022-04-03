import json
from kafka import KafkaConsumer

print("makan")

consumer = KafkaConsumer(
    'activity',
    bootstrap_servers = 'kafka:9092',
    auto_offset_reset='earliest',
    api_version=(0,10,1)
)
print("babi")

for message in consumer: 
    print(message.value)
