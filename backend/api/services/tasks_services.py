from ..models import Folders, Tasks
from django.db import transaction
from django.db import models
from .common_services import filter_objects, get_object, _update_folder_progress


def tasks_qs(user_id):
    return filter_objects(
        obj=Tasks.objects,
        only=("id", "title", "priority", "ready_status", "parent"),
        user_id=user_id,
    )


@transaction.atomic
def bulk_delete_tasks(ids, qs):
    parent_id = get_object(obj=Tasks.objects, id=ids[0]).parent_id
    folders = list(
        filter_objects(obj=qs, id__in=ids)
        .values_list("parent_id", flat=True)
        .distinct()
    )
    delete_count, _ = filter_objects(obj=qs, id__in=ids).delete()
    filter_objects(obj=Folders.objects, id=parent_id).update(
        task_count=models.F("task_count") - delete_count,
    )
    for folder_id in folders:
            if folder_id:
                _update_folder_progress(folder_id)
    return delete_count
