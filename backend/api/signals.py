from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Count, Q
from decimal import Decimal, ROUND_HALF_UP
from .models import Folders, Tasks


@receiver(post_save, sender=Tasks)
def update_folder_progress_on_task_save(sender, instance, created, **kwargs):
    if instance.parent_id:
        _update_folder_progress(instance.parent_id)


def _update_folder_progress(folder_id):
    folder = Folders.objects.get(id=folder_id)

    stats = Tasks.objects.filter(parent_id=folder_id).aggregate(
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
