from rest_framework import serializers
from .models import Users
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model

User = get_user_model()

class UsersSerializer(serializers.ModelSerializer): # ? сериализатор юзера с проверкой на одинакогово логина
    password = serializers.CharField(write_only=True)
    login = serializers.CharField(max_length=50, validators=[
        UniqueValidator(
            queryset=User.objects.all(),
            message="Это имя уже занято"
            )
        ]
    )

    class Meta:
        model = Users
        fields = '__all__'
    
    def create(self, validated_data): # ? создание самого юзера в бд
        return Users.objects.create_user(
            login=validated_data['login'],
            password=validated_data['password']
        )

        