from django.urls import path
from . import views

urlpatterns = [
    path('', views.VideoPreview.as_view(), name='get-videos-previews'),
    path('video/<int:video_id>', views.Video.as_view(), name='video'),
    path('video/<int:video_id>/comments', views.CommentVideo.as_view(), name='video'),
    path('video/<int:video_id>/rate', views.RateVideo.as_view(), name='rate-video'),
    path('video/<int:video_id>/delete', views.DeleteVideo.as_view(), name='delete-video'),
    path('comment/<int:comment_id>/delete', views.DeleteComment.as_view(), name='delete-comment')
]