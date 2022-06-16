from flask import request, Blueprint
from flask_restful import Api, Resource

from app.common.error_handling import ObjectNotFound
from .schemas import QueueSchema, QueuesMessagesSchema
from subprocess import run
import pika

queues_v1_0_bp = Blueprint('queues_v1_0_bp', __name__)
api = Api(queues_v1_0_bp)
queue_schema = QueueSchema()
mssg_schema = QueuesMessagesSchema()

credentials = pika.PlainCredentials('manager', 'manager')
# Local
parameters = pika.ConnectionParameters('192.168.251.134', 5672, 'su2', credentials)
# Server
# parameters = pika.ConnectionParameters('localhost', 5672, 'su2', credentials)


connection = pika.BlockingConnection(parameters)
channel = connection.channel()

# class UserListResource(Resource):
#     def post(self):
#         data = request.get_json()
#         queue_dict = queue_schema.load(data)
#         username = queue_dict['name']
#         try:
#             run(['rabbitmqctl set_permissions -p su2', username, "'' 'input' 'output.*'"])
#         except:
#             return 'Usuario existente', 409
#         resp = queue_dict
#         return resp, 201

class TestResource(Resource):
    def get(self):
        return 'Bos días', 200


class QueuesResource(Resource):

    def delete(self):
        data = request.get_json()
        queue_dict = queue_schema.load(data)
        try:
            channel.queue_delete(queue=queue_dict['name'])
        except:
            return 'La cola no existe', 404
        return queue_dict, 201

    def post(self):
        data = request.get_json()
        queue_dict = queue_schema.load(data)
        try:
            channel.queue_declare(queue_dict['name'])
            channel.queue_bind(exchange='output-', queue=queue_dict['name'], routing_key=queue_dict['name'])
        except:
            return 'Cola existente', 409
        return queue_dict, 201

class QueuesMessagesResource(Resource):
    def post(self):
        data = request.get_json()
        mssg_dict = mssg_schema.load(data)
        destination = mssg_dict['queueDestination']
        exchange = 'input' if mssg_dict['queueDestination']=='input' else 'output-'
        try:
            channel.basic_publish(exchange=exchange, routing_key=destination, body=mssg_dict)
        except:
            return 'Cola existente', 409
        return mssg_dict, 200


# api.add_resource(UserListResource, '/api/v1.0/users/', endpoint='user_list_resource')
# api.add_resource(QueueResource, '/api/v1.0/queues/<string:queueName>', endpoint='queue_resource')
api.add_resource(QueuesResource, '/api/v1.0/queues/', endpoint='queues_resource')
api.add_resource(QueuesMessagesResource, '/api/v1.0/queues/write/', endpoint='queues_messages_resource')
api.add_resource(TestResource, '/api/v1.0/test/', endpoint='test_resource')
