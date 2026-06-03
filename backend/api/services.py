from .models import Folders, Tasks
from django.db import transaction
from django.db import models

def only_object_decorator(func):
    def wrapper(obj, only=(), *args, **kwargs):
        return func(obj, *args, **kwargs).only(*only)
    return wrapper

@only_object_decorator
def all_objects(obj):
    return obj.all()

@only_object_decorator
def get_object(obj, id):
    return obj.get(id=id)

@only_object_decorator
def filter_objects(obj, **kwargs):
    return obj.filter(**kwargs)

def create_obj(serializer, user_id, **kwargs):
    return serializer.save(user_id=user_id, **kwargs)

def update(serializer, **kwargs):
    return serializer.save(**kwargs)

def folders(user_id):
    folder_list = all_objects(Folders.objects, only=('id', 'title', 'progress', 'ready_tasks', 'task_count'))
    return filter_objects(obj=folder_list, user_id=user_id) 
    
def folders_ret(user_id):
    folder_qs = all_objects(Folders.objects, only=('id', 'title', 'description', 'progress', 'ready_tasks', 'task_count'))
    return filter_objects(obj=folder_qs, user=user_id)
    
def get_folder_tasks(folder_id):
    tasks = all_objects(Tasks.objects, only=('id', 'title', 'priority', 'ready_status', 'parent'))
    filtered_tasks = filter_objects(obj=tasks, parent_id=folder_id)
    return list(filtered_tasks.values('id', 'title', 'priority', 'ready_status', 'parent'))

def create_task(serializer, parent, user_id):
    with transaction.atomic():
            create_obj(serializer, user_id=user_id, parent_id=parent)
            Folders.objects.filter(id=parent).update(
                task_count=models.F("task_count") + 1,
            )




