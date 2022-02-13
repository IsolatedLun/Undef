from django.urls import path
from . import views

urlpatterns = [
    path('channel/<int:channel_id>', views.ChannelView.as_view(), name='get-channel')
]