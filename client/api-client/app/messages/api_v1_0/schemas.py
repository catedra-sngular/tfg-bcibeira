from marshmallow import fields
from app.ext import ma

class ConnSchema(ma.Schema):
    connType = fields.Integer()
    dir = fields.String()
    user = fields.String()
    passwd = fields.String()

class FileSchema(ma.Schema):
    # localDir = fields.String()
    # remoteName = fields.String()
    data = fields.String()
    # fileName = fields.String()
