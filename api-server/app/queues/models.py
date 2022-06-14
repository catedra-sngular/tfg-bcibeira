from app.db import db, BaseModelMixin


class Queue(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, name, user):
        self.name = name
        self.user = user

    def __repr__(self):
        return f'Queue({self.name})'

    def __str__(self):
        return f'{self.name}'


class User(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'User({self.name})'

    def __str__(self):
        return f'{self.name}'