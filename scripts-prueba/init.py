#!/usr/bin/env python
import pika

def start():
  channel.exchange_declare('input')
  channel.queue_declare(queue='input')
  channel.queue_bind(exchange='input', queue='input', routing_key='input')
  channel.exchange_declare(exchange='output-')

  print('Creado intercambio de entrada (input)')
  print('Creada cola de entrada (input)')
  print('Creado intercambio de salida (output)')


# # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                      M A I N                        #
# # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # #

credentials = pika.PlainCredentials('manager', 'manager')
parameters = pika.ConnectionParameters('localhost', 5672, 'su2', credentials)

connection = pika.BlockingConnection(parameters)
channel = connection.channel()

start()

connection.close()
