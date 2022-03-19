from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView, Response
from rest_framework import status

from users.views import decode_user_id
from . import models
from . import serializers

OK = status.HTTP_200_OK
ERR = status.HTTP_400_BAD_REQUEST

MIN_REPORT_PERCENT = 0.40

def has_abnormal_reports(video):
    if (video.reports / video.views) > MIN_REPORT_PERCENT: 
        return True
    return False

class VideoPreview(APIView):
    def get(self, req):
        from random import shuffle
        videos = list(models.Video.objects.all())
        shuffle(videos)

        previews = serializers.VideoPreviewSerializer(videos, many=True).data

        return Response(previews, OK)

class Video(APIView):
    permission_classes = [AllowAny, IsAuthenticated]

    def check_permissions(self, request):
        return True

    def post(self, req, video_id):
        user_id = None
        if req.headers.get('Authorization', False):
            user_id = decode_user_id(req.headers)

        video = models.Video.objects.get(id=video_id)
        serializer = None

        if req.data['type'] == 'all':
            video.increment_views()
            
            serializer = serializers.VideoSerializer(video).data

            if user_id is not None:
                rated_video = models.RatedVideo.objects.get_or_create(video_id=video.id, user_id=user_id)[0]
                serializer['rate_type'] = rated_video.rate_type
            else:
                serializer['rate_type'] = ''
    
        else:
            serializer = serializers.VideoEditSerializer(video).data

        return Response(serializer, OK)

# =================
# Video Alterations
# =================
class RateVideo(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, video_id):
        def dislike(rated_video, video):
            if rated_video.rate_type == 'like':
                video.likes -= 1

            rated_video.rate_type = 'dislike'
            video.dislikes += 1

            rated_video.save()
            video.save(update_fields=['likes', 'dislikes'])
            return 'dislike'

        def like(rated_video, video):
            if rated_video.rate_type == 'dislike':
                video.dislikes -= 1

            rated_video.rate_type = 'like'
            video.likes += 1
            
            rated_video.save()
            video.save(update_fields=['likes', 'dislikes'])
            return 'like'

        def unrate(rated_video, video, rate_type):
            if rate_type == 'dislike':
                video.dislikes -= 1
            elif rate_type == 'like':
                video.likes -= 1

            rated_video.rate_type = ''

            rated_video.save()
            video.save(update_fields=['likes', 'dislikes'])
            
            return 'un' + rate_type

        user = models.cUser.objects.get(id=decode_user_id(req.headers))        
        video = models.Video.objects.get(id=video_id)
        rated_video = models.RatedVideo.objects.get_or_create(video_id=video_id, user_id=user.id)[0]
        rate_type = req.data['type']

        if rate_type == rated_video.rate_type:
            curr_type = unrate(rated_video, video, rate_type)
        elif rate_type == 'like':
            curr_type = like(rated_video, video)
        elif rate_type == 'dislike':
            curr_type = dislike(rated_video, video)

        data = {
                'rate_type': curr_type,
                'likes': video.likes,
                'dislikes': video.dislikes
            }

        return Response({'data': data}, OK)

class DeleteVideo(APIView):
    def post(self, req, video_id):
        try:
            video = models.Video.objects.get(id=video_id)
            video.delete()

            return Response({ 'detail': 'Video deleted' }, OK)
        except:
            return Response({ 'detail': 'Something went wrong' }, ERR)

class ReportVideo(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, video_id):
        video = models.Video.objects.get(id=video_id);
        video.reports += 1

        if has_abnormal_reports(video):
            video.delete()
            return Response({ 'detail': 'Video has been deleted to due many reports.' }, OK)
        else:
            video.save()
            return Response({ 'detail': 'Reported video.' }, OK)

# =================
# Video Comments
# =================
class CommentVideo(APIView):
    def get(self, req, video_id):
        comments = serializers.VideoCommentSerializer(models.Comment.objects.filter(video_id=video_id),
            many=True).data

        return Response(comments, OK)

    def post(self, req, video_id):
        user = models.cUser.objects.get(id=decode_user_id(req.headers))
        comment = models.Comment.objects.create(video_id=video_id, user=user, text=req.data['text'])

        return Response({ 'detail': 'Comment posted' }, OK)

class DeleteComment(APIView):
    def post(self, req, comment_id):
        try:
            comment = models.Comment.objects.get(id=comment_id)
            comment.delete()

            return Response({ 'detail': 'Comment deleted' }, OK)
        except:
            return Response({ 'detail': 'Something went wrong' }, ERR)