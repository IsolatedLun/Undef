from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from . import models
from . import serializers

OK = status.HTTP_200_OK
ERR = status.HTTP_400_BAD_REQUEST

class VideoPreview(APIView):
    def get(self, req):
        videos = models.Video.objects.all()
        previews = serializers.VideoPreviewSerializer(videos, many=True).data

        return Response(previews, OK)

class Video(APIView):
    def get(self, req, video_id):
        video = models.Video.objects.get(id=video_id)
        serializer = serializers.VideoSerializer(video).data

        return Response(serializer, OK)