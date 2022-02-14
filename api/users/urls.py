from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView, TokenObtainPairView)

urlpatterns = [
    path('token', TokenObtainPairView.as_view(), name='obtain-token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh-token')
]