from django.urls import path
from . import views

urlpatterns = [
    path('', views.VideoPreview.as_view(), name='get-videos-previews')
]