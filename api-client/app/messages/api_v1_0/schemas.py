from marshmallow import fields
from app.ext import ma

class ConnSchema(ma.Schema):
    connType = fields.Integer()
    dir = fields.String()
    user = fields.String()
    passwd = fields.String()
