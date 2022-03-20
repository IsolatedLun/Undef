from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView, TokenObtainPairView)
from . import views

urlpatterns = [
    path('token', views.JWTLogin.as_view(), name='obtain-token'),
    path('token/get', views.JWTCredentials.as_view(), name='get-credentials'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh-token'),

    path('register', views.Register.as_view(), name='post-register'),

    path('notifications', views.NotificationView.as_view(), name='notifications')
]