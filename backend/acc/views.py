from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UsersSerializer
from rest_framework import status
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken

# Create your views here.
class RegisterApi(APIView): # ? регистрация пользователя
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        serializer = UsersSerializer(data = request.data)

        if serializer.is_valid():
            user = serializer.save() # ? создание записи в бд и вывод в переменную
            refresh = RefreshToken.for_user(user) # ? генерация токенов для этого юзера
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = Response({
                "access": access_token,
            }, status=status.HTTP_201_CREATED) # ? ответ содержащий токен и юзера

            response.set_cookie( # ? закидывает рефреш токен в кукки
                key = settings.SIMPLE_JWT['REFRESH_COOKIE'],
                value = refresh_token,
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
            )

            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class CookieTokenView(TokenObtainPairView): # ? при входе создаётся токен рефреш в куки
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        refresh_token = response.data.get('refresh')

        if refresh_token:
            response.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE'],
                value = refresh_token,
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
            )

            del response.data['refresh']

        return response

class RefreshTokenView(TokenRefreshView): # ? автоматическая замена токенов
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['REFRESH_COOKIE'])

        if not refresh_token:
            raise InvalidToken('No refresh token in cookies') # ? если в куки нет токена

        data = {'refresh': refresh_token}# ? закидывает рефреш в сериализатор и валидирует
        serializer = self.get_serializer(data=data) 
        serializer.is_valid(raise_exception=True) 

        response = Response(serializer.validated_data) # ? генерирует ответ с валидированных данных по сути refresh

        new_refresh = response.data.get('refresh') # ? новый токен в переменной

        if new_refresh:
            response.set_cookie(
                key=settings.SIMPLE_JWT['REFRESH_COOKIE'],
                value=new_refresh,
                httponly=True
            )
            del response.data['refresh']
            
        return response # ? рефшешь в куки
            