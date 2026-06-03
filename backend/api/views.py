from rest_framework import viewsets, status
from .models import Folders, Tasks
from django.db import models
from .serializers import (
    FolderDetailSerializer,
    FoldersSerializer,
    FoldersList,
    TasksSerializer,
    FolderRenameSerializer,
    FolderCreateSerializer,
)
from rest_framework.response import Response
from rest_framework.decorators import action
from .signals import _update_folder_progress
from .services import folders, folders_ret, get_folder_tasks, create_obj, create_task, update
from django.forms.models import model_to_dict


class FolderTasksViewSets(viewsets.ModelViewSet):
    queryset = Folders.objects.all()
    serializer_class = FoldersSerializer

    def get_serializer_class(self):  # ? определение сериализатора по запросу
        if self.action == "retrieve":
            return FolderDetailSerializer
        elif self.action == "create":
            return FolderCreateSerializer
        return FoldersList

    def get_queryset(self):  # ? получить данные только этого юзера
        if self.action == "retrieve":
            return folders_ret(user_id=self.request.user.id)
        return folders(user_id=self.request.user.id)

    def retrieve(self, request, *args, **kwargs):
        folder_obj = self.get_object()
        tasks_data = get_folder_tasks(folder_id=folder_obj.id)

        folder_data = model_to_dict(
            folder_obj,
            fields=[
                "id",
                "title",
                "description",
                "progress",
                "ready_tasks",
                "task_count",
            ],
        )

        response_data = {**folder_data, "tasks": tasks_data}
        return Response(response_data)

    def perform_create(self, serializer):
        create_obj(serializer=serializer, user_id=self.request.user.id)

    @action(detail=True, methods=["post"], url_path="add_task")
    def add_task(self, request, pk=None):  # ? создать задачу
        folder = self.get_object()
        serializer = TasksSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        create_task(
            serializer=serializer, parent=folder.id, user_id=self.request.user.id
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["patch"], url_path="rename")
    def rename(self, request, pk=None):  # ? редактирование папки
        folder = self.get_object()
        serializer = FolderRenameSerializer(
            instance=folder, data=request.data, partial=True
        )
        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        update(serializer=serializer)
        return Response(FolderDetailSerializer(folder).data)


class TasksViewSets(viewsets.ModelViewSet):
    serializer = TasksSerializer

    def get_queryset(self):
        return Tasks.objects.filter(user=self.request.user.id)

    @action(detail=True, methods=["patch"], url_path="status")
    def status(self, request, pk=None):
        task = self.get_object()
        serializer = TasksSerializer(instance=task, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(status=400)

    @action(detail=False, methods=["delete"], url_path="bulk_delete")
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
