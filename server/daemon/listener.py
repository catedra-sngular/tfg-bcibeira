#!/usr/bin/env python
import pika, sys, os, time, json

manager_psswd = os.environ.get('MANAGER_PSSWD')
cred = pika.PlainCredentials('manager', manager_psswd)
# VM
# parameters = pika.ConnectionParameters('192.168.251.134', 5672, 'su2', credentials)
# DOCKER
param = pika.ConnectionParameters('rabbit', 5672, 'su2', cred) # heartbeat=0 para evitar timeout

conn = None
chann = None

def setUp():
  chann.exchange_declare('input')
  chann.queue_declare(queue='input')
  chann.queue_bind(exchange='input', queue='input', routing_key='input')
  chann.exchange_declare(exchange='output-')

  print('Creado intercambio de entrada (input)')
  print('Creada cola de entrada (input)')
  print('Creado intercambio de salida (output)')

def connect():
    global conn, chann
    conn = pika.BlockingConnection(param)
    chann = conn.channel()
    setUp()

def callback(ch, method, properties, data):
    body = json.loads(data)

    if body['type'] == 'run':
        binary = os.environ.get('BINARY')

        f = open("/hostpipe/workerpipe", "a")
        f.write(f"cd resources/{body['folder']} && {binary} {body['file']} && cd ../..") # cd r>
        f.close()

try:
  server_psswd = os.environ.get('SERVER_PSSWD')
  credentials = pika.PlainCredentials('server', server_psswd)
  parameters = pika.ConnectionParameters('rabbit', 5672, 'su2', credentials, heartbeat=0)
  connect()
  connection = pika.BlockingConnection(parameters)

  channel = connection.channel()
  channel.exchange_declare('input', passive=True)
  channel.queue_declare('input', passive=True)
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
