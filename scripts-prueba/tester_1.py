#!/usr/bin/env python
import pika

credentials = pika.PlainCredentials('manager', 'manager')
parameters = pika.ConnectionParameters('localhost',
                                   15672,
                                   'su2',
                                   credentials)

connection = pika.BlockingConnection(parameters)

channel = connection.channel()

channel.exchange_declare(exchange='input', passive=True)

message = 'probando... 1, 2, 3... '
channel.basic_publish(exchange='input', routing_key='input', body=message)
print(f" [x] Sent \n {message}")

connection.close()

