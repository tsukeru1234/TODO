from django.urls import path
from .views import RegisterApi, CookieTokenView, RefreshTokenView

urlpatterns = [
    path('register/', RegisterApi.as_view(), name='register'),
    path('token/', CookieTokenView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
]