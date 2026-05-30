from rest_framework.routers import SimpleRouter
from django.urls import path, include
from .views import FolderTasksViewSets, TasksViewSets

router = SimpleRouter()
router.register(r'folders', FolderTasksViewSets, basename='folder')
# ? /folders - get list | post create
# ? /folders/$id - get detail
# ? /folders/$id/add_task - создать задачу в папке
# ? folders/$id/rename - redact folder
router.register(r'tasks', TasksViewSets, basename='tasks')

urlpatterns = [
    path('api/', include(router.urls)),
    
]
