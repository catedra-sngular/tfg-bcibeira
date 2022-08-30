from marshmallow import fields
from app.ext import ma

class QueueSchema(ma.Schema):
    name = fields.String()

class FileSchema(ma.Schema):
    config = fields.String()
    mesh = fields.String()
    folder = fields.String()
    delay = fields.String()

class QueuesMessagesSchema(ma.Schema):
    queueSource = fields.String()
    queueDestination = fields.String()
    data = fields.String()
