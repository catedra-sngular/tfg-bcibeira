#!/usr/bin/env python
import pika, sys

def start():
  channel.exchange_declare('input')
  channel.queue_declare(queue='input')
  channel.queue_bind(exchange='input', queue='input', routing_key='input')
  channel.exchange_declare(exchange='output-')

  print('Creado intercambio de entrada (input)')
  print('Creada cola de entrada (input)')
  print('Creado intercambio de salida (output)')


def deleteQueue():
  queueName = sys.argv[2]
  channel.queue_delete(queue=queueName, if_empty=True)

  print(f'Cola de salida {queueName} eliminada')


def newQueue():
  queueName = sys.argv[2]
  channel.queue_declare(queueName)
  channel.queue_bind(exchange='output-', queue=queueName, routing_key=queueName)

  print(f'Cola de entrada {queueName} creada')

# # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                      M A I N                        #
# # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # #

credentials = pika.PlainCredentials('manager', 'manager')
parameters = pika.ConnectionParameters('localhost', 5672, 'su2', credentials)

connection = pika.BlockingConnection(parameters)
channel = connection.channel()

option = sys.argv[1]

if option == '--init':
  start()
if option == '--new_queue':
  newQueue()
if option == '--del_queue':
  deleteQueue()

connection.close()



