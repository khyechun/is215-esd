import smtplib
from email.message import EmailMessage

import json 
import os 
import amqp_setup 

EMAIL_ADDRESS = 'hosehtrades@gmail.com'
EMAIL_PASSWORD = 'lyhuroxfxmwrmzbh'


 
monitorBindingKey='#' 
 
def receiveOrderLog(): 
    amqp_setup.check_setup() 
         
    queue_name = 'Email' 
     
    # set up a consumer and start to wait for coming messages 
    amqp_setup.channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True) 
    amqp_setup.channel.start_consuming()
 
def callback(channel, method, properties, body): # required signature for the callback; no return 
    print("\nReceived an order log by " + __file__) 
    processEmailLog(json.loads(body)) 
    print() # print a new line feed 
 
def processEmailLog(details): 
    print(details)
    msg = EmailMessage()
    user_email= details['email'] 
    trade_id= details['tradeID']
    msg['Subject'] = f'(New Trade created!)'
    msg['From'] = EMAIL_ADDRESS 
    msg['To'] = user_email

    msg.set_content(f'Hi Beloved User, your trade: {trade_id} at HosehTrades has been successfully created! See you soon. Love, Khye Chun')
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD) 
        smtp.send_message(msg)
    # print("Recording an order log:") 
    # print(order) 
 
 
if __name__ == "__main__":  # execute this program only if it is run as a script (not by 'import') 
    print("\nThis is " + os.path.basename(__file__), end='') 
    print(": monitoring routing key '{}' in exchange '{}' ...".format(monitorBindingKey, amqp_setup.exchangename)) 
    receiveOrderLog()

