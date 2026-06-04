from ..models import Folders, Tasks
from django.db.models import Count, Q
from decimal import Decimal, ROUND_HALF_UP


def only_object_decorator(func):
    def wrapper(obj, only=(), *args, **kwargs):
        queryset = func(obj, *args, **kwargs)
        return queryset.only(*only) if only else queryset

    return wrapper


@only_object_decorator
def all_objects(obj):
    return obj.all()


@only_object_decorator
def get_object(obj, **kwargs):
    return obj.get(**kwargs)


@only_object_decorator
def filter_objects(obj, **kwargs):
    return obj.filter(**kwargs)


def create_obj(serializer, user_id, **kwargs):
    return serializer.save(user_id=user_id, **kwargs)


def update(serializer, **kwargs):
    return serializer.save(**kwargs)


def _update_folder_progress(folder_id):
    folder = get_object(Folders.objects, id=folder_id)
    stats = filter_objects(obj=Tasks.objects,only=("id", "ready_status", "parent"), parent_id=folder_id).aggregate(
        total=Count('id'),
        ready=Count('id', filter=Q(ready_status=True))
    )
    
    total = stats['total'] or 0
    ready = stats['ready'] or 0
    
    folder.task_count = total
    folder.ready_tasks = ready

    if total == 0:
        folder.progress = Decimal("0.00")
    else:
        progress = (Decimal(ready) / Decimal(total)) * Decimal("100")
        folder.progress = progress.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

    folder.save(update_fields=["progress", "ready_tasks"])