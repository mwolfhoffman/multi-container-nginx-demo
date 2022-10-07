# Generated by Django 3.2.7 on 2022-10-07 15:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20210117_1516'),
    ]

    operations = [
        migrations.CreateModel(
            name='TodoModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=1000)),
                ('completed', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(default=datetime.datetime(2022, 10, 7, 15, 46, 11, 649868))),
                ('updated_at', models.DateTimeField(default=datetime.datetime(2022, 10, 7, 15, 46, 11, 649939))),
            ],
        ),
    ]