from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.files.uploadedfile import TemporaryUploadedFile, InMemoryUploadedFile

from users.views import decode_user_id
from . import models
from . import serializers

from videos.models import Video
from videos.serializers import VideoPreviewSerializer

OK = status.HTTP_200_OK
ERR = status.HTTP_400_BAD_REQUEST
NULL = status.HTTP_404_NOT_FOUND

class ChannelView(APIView):
    def get(self, req, channel_id, user_id):
        try:
            channel = models.Channel.objects.get(id=channel_id)
            channel_serializer = serializers.ChannelSerializer(channel).data

            channel_videos = Video.objects.filter(channel_id=channel_id)
            videos_serializer = VideoPreviewSerializer(channel_videos, many=True).data
            
            if int(user_id) > -1:
                subscribed, created = models.SubscribedChannel.objects.get_or_create(channel_id=channel_id,
                    user_id=user_id)

                channel_serializer['subscribed'] = subscribed.subscribed
            else:
                channel_serializer['subscribed'] = False

            return Response({ 'channel': channel_serializer, 
                'videos': videos_serializer}, OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Channel does not exist'}, NULL)

class ChannelUpload(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, channel_id):
        new_video_data = {
            'title': req.data['title'],
            'description': req.data['description'],
            'visibility': req.data['visibility'],
            'channel_id': req.data['channel_id'],
            'user_id': req.data['user_id'],
            'video': req.data['video'],
            'thumbnail': req.data['thumbnail']
        }

        new_video = Video.objects.create(**new_video_data)
        return Response({'detail': 'Video uploaded'}, status=OK)

class ChannelSubscribe(APIView):
    def post(self, req, channel_id):
        def subscribe(channel, subscribable_channel):
            channel.user.subscribers += 1
            subscribable_channel.subscribed = True

            channel.user.save()
            subscribable_channel.save()

            return Response({'data': {
                'subscribers': channel.user.subscribers,
                'subscribed': True
            }}, status=OK)

        def unsubscribe(channel, subscribable_channel):
            channel.user.subscribers -= 1
            subscribable_channel.subscribed = False

            channel.user.save()
            subscribable_channel.save()

            return Response({'data': {
                'subscribers': channel.user.subscribers,
                'subscribed': False
            }}, status=OK)


        user_id = decode_user_id(req.headers)

        if user_id:
            channel = models.Channel.objects.get(id=channel_id)
            subscribable_channel, created = models.SubscribedChannel.objects.get_or_create(channel_id=channel_id, 
            user_id=user_id)

            

            if subscribable_channel.subscribed:
                return unsubscribe(channel, subscribable_channel)
            else:
                return subscribe(channel, subscribable_channel)

        return Response({'detail': 'You must be logged in.'})

class EditChannelVideo(APIView):
    def post(self, req, channel_id, video_id):
        req.data._mutable = True

        def clean_data(edit_video_dict: dict):
            if not isinstance(edit_video_dict['thumbnail'], (InMemoryUploadedFile, TemporaryUploadedFile)):
                edit_video_dict.pop('thumbnail')

            return edit_video_dict

        video = Video.objects.get(id=video_id, channel_id=channel_id)

        data = clean_data(req.data)

        video.title = data['title']
        video.description = data['description']
        video.visibility = data['visibility']
        if data.get('thumbnail', False):
            video.thumbnail = data['thumbnail']

        video.save(update_fields=['title', 'description', 'visibility', 'thumbnail'])

        return Response({'detail': 'Updated video.'})
