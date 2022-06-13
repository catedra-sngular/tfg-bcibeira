#!/usr/bin/env python
import pika, sys, os

try:
  credentials = pika.PlainCredentials(sys.argv[1], sys.argv[1])
  parameters = pika.ConnectionParameters('192.168.251.134',
                                     5672,
                                     'su2',
                                     credentials)

  connection = pika.BlockingConnection(parameters)

  inChannel = connection.channel()
  inChannel.exchange_declare('output-', passive=True)
  inChannel.queue_declare(sys.argv[2], passive=True)

  def callback(ch, method, properties, body):
      print(" [x] Received\n%r" % body)


  inChannel.basic_consume(sys.argv[2], on_message_callback=callback, auto_ack=True)
  print(' [*] Waiting for server response. To exit press CTRL+C')
  inChannel.start_consuming()

  connection.close()

except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
