from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView, Response
from rest_framework import status

from users.views import decode_user_id
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
        video.increment_views()
        
        serializer = serializers.VideoSerializer(video).data

        return Response(serializer, OK)

class RateVideo(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, video_id):
        def dislike(rated_video, video):
            if rated_video.rate_type == 'like':
                video.likes -= 1

            rated_video.rate_type = 'dislike'
            video.dislikes += 1

            rated_video.save()
            video.save()
            return Response({'data': 'dislike'}, OK)

        def like(rated_video, video):
            if rated_video.rate_type == 'dislike':
                video.dislikes -= 1

            rated_video.rate_type = 'like'
            video.likes += 1
            
            rated_video.save()
            video.save()
            return Response({'data': 'like'}, OK)

        def unrate(rated_video, video, rate_type):
            if rate_type == 'dislike':
                video.dislikes -= 1
            elif rate_type == 'like':
                video.likes -= 1

            rated_video.rate_type = ''

            rated_video.save()
            video.save()
            return Response({'data': 'un' + rate_type}, OK)

        user = models.cUser.objects.get(id=decode_user_id(req.headers))        
        video = models.Video.objects.get(id=video_id)
        rated_video = models.RatedVideo.objects.get_or_create(video_id=video_id, user_id=user.id)[0]
        rate_type = req.data['type']

        if rate_type == rated_video.rate_type:
            return unrate(rated_video, video, rate_type)
        elif rate_type == 'like':
            return like(rated_video, video)
        elif rate_type == 'dislike':
            return dislike(rated_video, video)
