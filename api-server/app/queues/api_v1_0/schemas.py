from app.queues.models import User
from marshmallow import fields
from app.ext import ma

class QueueSchema(ma.Schema):
    name = fields.String()
    # user = fields.String()
    #data = fields.String()

class QueuesMessagesSchema(ma.Schema):
    queueSource = fields.String()
    queueDestination = fields.String()
    data = fields.String()


class UserSchema(ma.Schema):
    name = fields.String()