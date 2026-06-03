from rest_framework import viewsets, status
from django.db import transaction
from .models import Folders, Tasks
from django.db import models
from .serializers import (
    FolderDetailSerializer,
    FoldersSerializer,
    TasksSerializer,
    FolderRenameSerializer,
)
from rest_framework.response import Response
from rest_framework.decorators import action
from .signals import _update_folder_progress

class FolderTasksViewSets(viewsets.ModelViewSet):
    def get_serializer_class(self):  # ? определение сериализатора по запросу
        if self.action == "retrieve":
            return FolderDetailSerializer
        return FoldersSerializer

    def perform_create(self, serializer):
        description = serializer.validated_data.get("description")
        serializer.save(user_id=self.request.user.id, description=description)

    def get_queryset(self):  # ? получить данные только этого юзера
        return Folders.objects.filter(user=self.request.user.id)

    @action(detail=True, methods=["post"])
    def add_task(self, request, pk=None):  # ? создать задачу
        instance = self.get_object()
        serializer = TasksSerializer(data=request.data)

        with transaction.atomic():
            if serializer.is_valid():
                serializer.save(parent=instance, user_id=self.request.user.id)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["patch"])
    def rename(self, request, pk=None):  # ? редактирование папки
        folder = self.get_object()
        serializer = FolderRenameSerializer(
            instance=folder, data=request.data, partial=True
        )

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(status=400)


class TasksViewSets(viewsets.ModelViewSet):
    serializer = TasksSerializer
    def get_queryset(self):
        return Tasks.objects.filter(user=self.request.user.id)

    @action(detail=True, methods=["patch"])
    def status(self, request, pk=None):
        task = self.get_object()
        serializer = TasksSerializer(instance=task, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(status=400)

    @action(detail=False, methods=["delete"])
    def bulk_delete(self, request):
        ids = request.data.get("ids", [])
        if not ids:
            return Response(
                {"errors": "список не предоставлен"}, status=status.HTTP_400_BAD_REQUEST
            )
        task = Tasks.objects.get(id=ids[0])
        folder_ids = list(
            self.get_queryset()
            .filter(id__in=ids)
            .values_list("parent_id", flat=True)
            .distinct()
        )
        deleteCount, _ = self.get_queryset().filter(id__in=ids).delete()
        Folders.objects.filter(id=task.parent_id).update(
            task_count=models.F("task_count") - deleteCount,
        )
        for folder_id in folder_ids:
            if folder_id:
                _update_folder_progress(folder_id)
        return Response(status=status.HTTP_204_NO_CONTENT)
