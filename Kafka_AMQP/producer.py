import time 
import json 
import random 
from datetime import datetime
from random_data import generate_message
from kafka import KafkaProducer

def serializer(message):
    return json.dumps(message).encode('utf-8')

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=serializer
)

if __name__ == "__main__":
    #infinite loop - runs until you kill the program 
    while True:
        dummy_message = generate_message()

        #send it to our 'messages' topic 
        print(f'Producing Message @ {datetime.now()} | Message = {str(dummy_message)}')
        producer.send('messages', dummy_message)

        #Sleep for a number of seconds 
        time_to_sleep = random.randint(1,11)
        time.sleep(time_to_sleep)

        