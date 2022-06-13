#!/usr/bin/env python
import pika

credentials = pika.PlainCredentials('tester_1', 'tester_1')
parameters = pika.ConnectionParameters('192.168.251.134',
                                   5672,
                                   'su2',
                                   credentials)

connection = pika.BlockingConnection(parameters)

channel = connection.channel()

channel.exchange_declare(exchange='input', passive=True)

message = '\n qwe \n dofi \n rethbn \n rthnb \n rtwer \n wetr \n'
channel.basic_publish(exchange='input', routing_key='input', body=message)
print(f" [x] Sent \n {message}")

connection.close()

