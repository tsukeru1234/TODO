import uuid
from django.db import models

class DeadLines(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey('Users', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    priority = models.SmallIntegerField(blank=True, null=True)
    task_count = models.IntegerField()
    progress = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    recurence = models.BooleanField(blank=True, null=True)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    create_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = 'dead_lines'


class Events(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey('Users', on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    priority = models.SmallIntegerField(blank=True, null=True)
    title = models.CharField(max_length=250)
    create_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'events'

class Users(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    login = models.CharField(unique=True, max_length=50)
    password = models.TextField()
    last_login = models.DateTimeField(
        blank=True, 
        null=True, 
        verbose_name='last login'
    )

    class Meta:
        managed = False
        db_table = 'users'


class Folders(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey('Users', on_delete=models.CASCADE)
    task_count = models.IntegerField()
    progress = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    description = models.TextField(null=True)
    create_at = models.DateTimeField(blank=True, null=True)
    title = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'folders'


class Tasks(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    parent = models.ForeignKey(Folders, on_delete=models.CASCADE, related_name='tasks')
    user = models.ForeignKey('Users', on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    create_at = models.DateTimeField()
    priority = models.SmallIntegerField(blank=True, null=True)
    ready_status = models.BooleanField(default=False)

    class Meta:
        managed = False
        db_table = 'tasks'

