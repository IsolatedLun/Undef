from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView, TokenObtainPairView)
from . import views

urlpatterns = [
    path('token', views.JWTView.as_view(), name='obtain-token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh-token'),

    path('register', views.Register.as_view(), name='post-register')
]