from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from . import models
from . import serializers

from videos.models import Video
from videos.serializers import VideoPreviewSerializer

OK = status.HTTP_200_OK
ERR = status.HTTP_400_BAD_REQUEST
NULL = status.HTTP_404_NOT_FOUND

class ChannelView(APIView):
    def get(self, req, channel_id):
        try:
            channel = models.Channel.objects.get(user__id=channel_id)
            channel_serializer = serializers.ChannelSerializer(channel).data

            channel_videos = Video.objects.filter(channel_id=channel_id)
            videos_serializer = VideoPreviewSerializer(channel_videos, many=True).data

            return Response({ 'channel': channel_serializer, 
                'videos': videos_serializer}, OK)
        except:
            return Response({'detail': 'Channel does not exist'}, NULL)