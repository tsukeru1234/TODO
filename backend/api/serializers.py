from rest_framework import serializers
from.models import Tasks, Folders

# * True api
class FoldersSerializer(serializers.ModelSerializer): # ? просто для списка папок
    task_count = serializers.IntegerField(default = 0)
    progress = serializers.DecimalField(max_digits=5, decimal_places=2,default = 0.00)
    description = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = Folders
        fields = ['id', 'title', 'task_count', 'progress', 'description']
        read_only_fields = ['description']
        
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
        fields = ['id', 'title', 'priority']
        read_only_fields = ['parent']

class FolderDetailSerializer(serializers.ModelSerializer): # ?детальный просмотр папки 
    tasks = TasksSerializer(many=True, read_only=True)

    class Meta:
        model = Folders
        fields = ['id', 'title', 'description', 'progress', 'task_count', 'tasks']
        read_only_fields = ['progress', 'tasks'] #! потом заменить данные будут расчитываться на сервере и отправляться сюда