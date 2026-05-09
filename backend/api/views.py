from rest_framework import viewsets, status
from .models import Folders
from .serializers import FolderDetailSerializer, FoldersSerializer, TasksSerializer, FolderRenameSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class FolderTasksViewSets(viewsets.ModelViewSet):
    def get_serializer_class(self): # ? определение сериализатора по запросу
        if self.action == 'retrieve':
            return FolderDetailSerializer
        return FoldersSerializer
    def perform_create(self, serializer):
        description = serializer.validated_data.get('description')
        serializer.save(user_id=self.request.user.id, description=description)
    
    def get_queryset(self): # ? получить данные только этого юзера
        return Folders.objects.filter(user=self.request.user.id)

    @action(detail=True, methods=['post'])
    def add_task(self, request, pk = None): # ? создать задачу
        instance = self.get_object()
        serializer = TasksSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save(parent = instance, user_id=self.request.user.id)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=["patch"])
    def rename(self, request, pk=None):# ? редактирование папки
        folder = self.get_object()
        serializer = FolderRenameSerializer(instance=folder, data = request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(status=400)