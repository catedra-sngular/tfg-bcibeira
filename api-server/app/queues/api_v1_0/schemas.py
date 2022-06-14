from app.queues.models import User
from marshmallow import fields
from app.ext import ma

class QueueSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    user = fields.Int()


class UserSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()