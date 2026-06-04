from ..models import Folders, Tasks
from django.db import transaction
from django.db import models
from .common_services import filter_objects, create_obj, _update_folder_progress


def folders(user_id):
    return filter_objects(
        obj=Folders.objects,
        only=("id", "title", "progress", "ready_tasks", "task_count"),
        user_id=user_id,
    )


def folders_ret(user_id):
    return filter_objects(
        obj=Folders.objects,
        only=("id", "title", "description", "progress", "ready_tasks", "task_count"),
        user=user_id,
    )


def get_folder_tasks(folder_id):
    filtered_tasks = filter_objects(
        obj=Tasks.objects,
        only=("id", "title", "priority", "ready_status", "parent"),
        parent_id=folder_id,
    )
    return list(
        filtered_tasks.values("id", "title", "priority", "ready_status", "parent")
    )


@transaction.atomic
def create_task(serializer, parent, user_id):
    create_obj(serializer, user_id=user_id, parent_id=parent)
    Folders.objects.filter(id=parent).update(
        task_count=models.F("task_count") + 1,
    )
    _update_folder_progress(folder_id=parent)
    
