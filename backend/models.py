# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Folders(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    task_count = models.IntegerField()
    ready_tasks = models.IntegerField()
    progress = models.DecimalField(max_digits=5, decimal_places=2)
    title = models.CharField(max_length=80)
    description = models.TextField(blank=True, null=True)
    create_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'folders'


class Tasks(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    parent = models.ForeignKey(Folders, models.DO_NOTHING)
    title = models.CharField(max_length=250)
    priority = models.SmallIntegerField()
    ready_status = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tasks'


class Users(models.Model):
    id = models.UUIDField(primary_key=True)
    login = models.CharField(unique=True, max_length=50)
    password = models.TextField()
    last_login = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
