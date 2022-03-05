from django.urls import path
from . import views

urlpatterns = [
    path('channel/<int:channel_id>/<str:user_id>', views.ChannelView.as_view(), 
        name='get-channel'),
        
    path('channel/upload/<int:channel_id>', views.ChannelUpload.as_view(), 
        name='post-channel-video'),

    path('channel/subscribe/<int:channel_id>', views.ChannelSubscribe.as_view(), 
        name='post-channel-subscribe'),

    path('channel/<int:channel_id>/edit/<int:video_id>', views.EditChannelVideo.as_view(), 
        name='post-edit-video')
]