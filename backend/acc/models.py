import uuid
from django.db import models
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
# Create your models here.

class MyUsersManager(BaseUserManager):
    def create_user(self, login, password=None, **kwargs):
        user = self.model(login=login, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user


class Users(AbstractBaseUser): # ? Модель юзера
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    login = models.CharField(unique=True, max_length=50)
    password = models.TextField()
    last_login = models.DateTimeField(
        blank=True, 
        null=True, 
        verbose_name='last login'
    )

    USERNAME_FIELD = 'login'
    objects = MyUsersManager()

    class Meta:
        managed = False
        db_table = 'users'