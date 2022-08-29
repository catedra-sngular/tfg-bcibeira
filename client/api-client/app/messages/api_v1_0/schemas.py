from marshmallow import fields
from app.ext import ma

class ConnSchema(ma.Schema):
    connType = fields.Integer()
    address = fields.String()
    user = fields.String()
    password = fields.String()

class FileSchema(ma.Schema):
    data = fields.String()
    delay = fields.String()
