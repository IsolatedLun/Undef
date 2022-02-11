from django.urls import path
from . import views

urlpatterns = [
    path('', views.VideoPreview.as_view(), name='get-videos-previews'),
    path('video/<int:video_id>', views.Video.as_view(), name='video')
]