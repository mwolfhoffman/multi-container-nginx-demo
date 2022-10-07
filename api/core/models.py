from datetime import datetime
from pyexpat import model
from xmlrpc.client import DateTime
from django.db import models


class UserModel(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)


class TodoModel(models.Model):
    text = models.TextField(max_length=1000)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
