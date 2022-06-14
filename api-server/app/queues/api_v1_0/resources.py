from flask import request, Blueprint
from flask_restful import Api, Resource

from app.common.error_handling import ObjectNotFound
from .schemas import QueueSchema
from ..models import Queue, User

queues_v1_0_bp = Blueprint('queues_v1_0_bp', __name__)
queue_schema = QueueSchema()
api = Api(queues_v1_0_bp)

class UserListResource(Resource):
    def get(self):
        users = User.get_all()
        result = queue_schema.dump(users, many=True)
        return result

    def post(self):
        data = request.get_json()
        queue_dict = queue_schema.load(data)
        user = User(name=queue_dict['name'])
        user.save()
        resp = queue_schema.dump(user)
        return resp, 201

class QueueResource(Resource):
    def get(self, queue_id):
        queue = Queue.get_by_id(queue_id)
        if queue is None:
          raise ObjectNotFound('La cola no existe')
        resp = queue_schema.dump(queue)
        return resp

    def delete(self, queue_id):
        queue = Queue.get_by_id(queue_id)
        if queue is None:
          raise ObjectNotFound('La cola no existe')
        queue.delete()
        resp = queue_schema.dump(queue)
        return resp, 200

class QueuesResource(Resource):
    def get(self):
        queues = Queue.get_all()
        result = queue_schema.dump(queues, many=True)
        return result

    def post(self):
        data = request.get_json()
        queue_dict = queue_schema.load(data)
        queue = Queue(name=queue_dict['name'], user=queue_dict['user'])
        queue.save()
        resp = queue_schema.dump(queue)
        return resp, 201


api.add_resource(UserListResource, '/api/v1.0/users/', endpoint='user_list_resource')
api.add_resource(QueueResource, '/api/v1.0/queues/<int:queue_id>', endpoint='queue_resource')
api.add_resource(QueuesResource, '/api/v1.0/queues/', endpoint='queues_resource')
