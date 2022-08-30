from flask import request, Blueprint
from flask_restful import Api, Resource

from .schemas import QueueSchema, QueuesMessagesSchema, FileSchema
import pika, os, json
from random import randint
from time import sleep

queues_v1_0_bp = Blueprint('queues_v1_0_bp', __name__)
api = Api(queues_v1_0_bp)
file_schema = FileSchema()
queue_schema = QueueSchema()
mssg_schema = QueuesMessagesSchema()

manager_psswd = os.environ.get('MANAGER_PSSWD')
credentials = pika.PlainCredentials('manager', manager_psswd)

# DOCKER
parameters = pika.ConnectionParameters('rabbit', 5672, 'su2', credentials, heartbeat=0) # heartbeat=0 para evitar timeout

connection = None
channel = None

if not os.path.exists('/hostpipe/resources'):
    os.mkdir('/hostpipe/resources')

def getHashCode():
    return str(randint(100000, 999999))

def createQueue(name):
    channel.queue_declare(queue=name)
    channel.queue_bind(exchange='output-', queue=name, routing_key=name)

def readQueue(queue):
    channel = connection.channel()
    channel.exchange_declare('output-', passive=True)
    channel.queue_declare(queue, passive=True)
    sleep(2)
    method, properties, body = channel.basic_get(queue)

    return json.loads(body)['data'] if method else 'Any message yet'


def obtainFolder():
    baseDir = '/hostpipe/resources/'
    folderName = ''
    while (not folderName.__len__()):
        hash = getHashCode()
        if (not os.path.exists(baseDir + 'exec_' + hash)):
            folderName = baseDir + 'exec_' + hash

    os.mkdir(folderName)
    os.system('./chmod.sh')

    createQueue(f'output-{hash}')

    return 'exec_' + hash + '/'

def setUp():
  channel.exchange_declare('input')
  channel.queue_declare(queue='input')
  channel.queue_bind(exchange='input', queue='input', routing_key='input')
  channel.exchange_declare(exchange='output-')

  print('Creado intercambio de entrada (input)')
  print('Creada cola de entrada (input)')
  print('Creado intercambio de salida (output)')

def connect():
    global connection, channel
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()
    setUp()

class ConnectionResource(Resource):
    def get(self):
        connect()
        return 200

class TestResource(Resource):
    def get(self):
        return 'Bos días', 200


## Crear y borrar colas Rabbitmq
class QueuesResource(Resource):
    def delete(self):
        data = request.get_json()
        queue_dict = queue_schema.load(data)
        queueName = queue_dict['name']
        try:
            channel.queue_delete(queue=queueName)
            print(f'Cola de salida {queueName} eliminada')
        except:
            if channel:
                return 'La cola no existe', 404
            else:
                return 'No se ha realizado la conexión previamente', 500
        return queue_dict, 201

    def post(self):
        data = request.get_json()
        queue_dict = queue_schema.load(data)
        queueName = queue_dict['name']
        try:
            channel.queue_declare(queueName)
            channel.queue_bind(exchange='output-', queue=queueName, routing_key=queueName)
            print(f'Cola de entrada {queueName} creada')
        except:
            if channel:
                return 'Cola existente', 409
            else:
                return 'No se ha realizado la conexión previamente', 500
        return queue_dict, 201

## Paso de mensajes
class QueuesMessagesResource(Resource):
    def get(self, hash):
        message = readQueue(f'output-{hash}')

        return message, 200

    # def post(self):
    #     data = request.get_json()
    #     mssg_dict = mssg_schema.load(data)
    #     destination = mssg_dict['queueDestination']
    #     exchange = 'input' if mssg_dict['queueDestination']=='input' else 'output-'
    #     try:
    #         channel.basic_publish(exchange=exchange, routing_key=destination, body=mssg_dict)
    #     except:
    #         if channel:
    #             return 'Cola existente', 409
    #         else:
    #             return 'No se ha realizado la conexión previamente', 500
    #     return mssg_dict, 200

class FileResource(Resource):
    def post(self):
        data = request.get_json()
        file_dict = file_schema.load(data)
        configFilename = file_dict["config"]
        folder = file_dict["folder"]
        time = file_dict["delay"]
        hash = folder[5:11]

        data = {
            "folder": folder,
            "file": configFilename,
            "type": 'run',
            "time": time,
            "queue": f'output-{hash}'
        }
        destination = 'input'
        exchange = 'input'
        try:
            channel.basic_publish(exchange=exchange, routing_key=destination, body=json.dumps(data))
        except:
            if channel:
                return 'Cola existente', 409
            else:
                return 'No se ha realizado la conexión previamente', 500
        return 200

class FolderResource(Resource):

    def get(self):
        connect()
        folderName = obtainFolder()
        return folderName, 200

api.add_resource(ConnectionResource, '/api/v1.0/connection/', endpoint='connection_resource')
api.add_resource(QueuesResource, '/api/v1.0/queues/', endpoint='queues_resource')
api.add_resource(QueuesMessagesResource, '/api/v1.0/queues-messages/<int:hash>', endpoint='queues_messages_resource')
api.add_resource(TestResource, '/api/v1.0/test/', endpoint='test_resource')
api.add_resource(FileResource, '/api/v1.0/file/', endpoint='file_resource')
api.add_resource(FolderResource, '/api/v1.0/folder/', endpoint='folder_resource')
