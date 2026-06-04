from rest_framework import serializers
from.models import Tasks, Folders

class FoldersList(serializers.ModelSerializer): # ? просто для списка папок
    class Meta:
        model = Folders
        fields = ['id', 'title', 'task_count', 'progress', 'ready_tasks']
        read_only_fields = ['ready_tasks', 'task_count', 'progress']

class FolderCreateSerializer(serializers.ModelSerializer):
    description = serializers.CharField(allow_null=True, required=False, allow_blank=True)
    class Meta:
        model = Folders
        fields = ['id', 'title', 'task_count', 'progress', 'ready_tasks', 'description']
        read_only_fields = ['ready_tasks', 'task_count', 'progress']
        
class FolderRenameSerializer(serializers.ModelSerializer): # ? редактирование папки
    class Meta:
        model = Folders
        fields = ['title', 'description']
        extra_kwargs = {
            'description': {'required': False}
        }



class TasksSerializer(serializers.ModelSerializer): # ? задачи
    class Meta:
        model = Tasks
        fields = ['id', 'title', 'priority', 'ready_status']
        read_only_fields = ['parent']

class FolderDetailSerializer(serializers.ModelSerializer): # ?детальный просмотр папки 
    tasks = TasksSerializer(many=True, read_only=True)

    class Meta:
        model = Folders
        fields = ['id', 'title', 'description', 'progress', 'task_count', 'ready_tasks', 'tasks']
        read_only_fields = ['progress', 'tasks', 'ready_tasks', 'task_count']