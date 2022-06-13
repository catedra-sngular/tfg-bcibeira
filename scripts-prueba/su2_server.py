#!/usr/bin/env python
from random import randint
from subprocess import run
import pika, sys, os

def callback(ch, method, properties, body):
    outputQueue = f'output-{randint(1000, 9999)}'
    print(f" [x] Received {body}")

    print(f" Yor queue name is {outputQueue}")
    run(['python3', 'manager.py', '--new_queue', outputQueue])
    # channel.queue_declare(outputQueue) # create
    # channel.queue_bind(exchange='output-', queue=outputQueue, routing_key=outputQueue)
    channel.basic_publish(exchange='output-',
            routing_key=outputQueue,
            body='Starting')

try:
  credentials = pika.PlainCredentials('server', 'server')
  parameters = pika.ConnectionParameters('localhost',
                                          5672,
                                          'su2',
                                          credentials)

  connection = pika.BlockingConnection(parameters)

  # inChannel = connection.channel()
  # inChannel.exchange_declare('input', passive=True)
  # inChannel.queue_declare('input', passive=True)

  # outChannel = connection.channel()
  # outChannel.exchange_declare('output-', passive=True)

  # def callback(ch, method, properties, body):
  #     outputQueue = f'output-{randint()}'
  #     print(f" [x] Received {body}")

  #     print(f" Yor queue name is {outputQueue}")
  #     outChannel.queue_declare(outputQueue) # create
  #     outChannel.queue_bind(exchange='output-', queue=outputQueue, routing_key=outputQueue)
  #     outChannel.basic_publish(exchange='output-',
  #             routing_key=outputQueue,
  #             body='Starting')


  # inChannel.basic_consume('input', on_message_callback=callback, auto_ack=True)
  # print(' [*] Waiting for files. To exit press CTRL+C')
  # inChannel.start_consuming()

  channel = connection.channel()
  channel.exchange_declare('input', passive=True)
  channel.queue_declare('input', passive=True)

  channel = connection.channel()
  channel.exchange_declare('output-', passive=True)

  channel.basic_consume('input', on_message_callback=callback, auto_ack=True)
  print(' [*] Waiting for files. To exit press CTRL+C')
  channel.start_consuming()

  connection.close()

except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
