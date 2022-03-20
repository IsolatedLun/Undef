from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.files.uploadedfile import TemporaryUploadedFile, InMemoryUploadedFile

from users.views import decode_user_id
from users.models import Notification
from . import models
from . import serializers

import videos.models as videoModels
from videos.serializers import VideoPreviewSerializer

OK = status.HTTP_200_OK
ERR = status.HTTP_400_BAD_REQUEST
NULL = status.HTTP_404_NOT_FOUND

def send_notifications(video, channel_id):
    subsribers = models.SubscribedChannel.objects.filter(channel_id=channel_id)

    for x in subsribers:
        if x.subscribed:
            Notification.objects.create(user_id=x.user.id, video=video)

class ChannelView(APIView):
    def get(self, req, channel_id, user_id):
        try:
            channel = models.Channel.objects.get(id=channel_id)
            channel_serializer = serializers.ChannelSerializer(channel).data

            channel_videos = videoModels.Video.objects.filter(channel_id=channel_id)
            videos_serializer = VideoPreviewSerializer(channel_videos, many=True).data
            
            if int(user_id) > -1:
                subscribed, created = models.SubscribedChannel.objects.get_or_create(channel_id=channel_id,
                    user_id=user_id)

                channel_serializer['subscribed'] = subscribed.subscribed
            else:
                channel_serializer['subscribed'] = False

            return Response({ 'channel': channel_serializer, 
                'videos': videos_serializer}, OK)
        except:
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

        new_video = videoModels.Video.objects.create(**new_video_data)
        send_notifications(new_video, channel_id)

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

        video = videoModels.Video.objects.get(id=video_id, channel_id=channel_id)

        data = clean_data(req.data)

        video.title = data['title']
        video.description = data['description']
        video.visibility = data['visibility']
        if data.get('thumbnail', False):
            video.thumbnail = data['thumbnail']

        video.save(update_fields=['title', 'description', 'visibility', 'thumbnail'])

        return Response({'detail': 'Updated video.'}, OK)

class EditChannelDetails(APIView):
    def post(self, req, channel_id):
        user_id = decode_user_id(req.headers)

        channel = models.Channel.objects.get(user_id=user_id)
        if channel.id == channel_id:
            channel.channel_details = req.data
            channel.save()
            
            return Response({'detail': 'Updated channel.'}, OK)
        else:
            return Response({'detail': 'User and channel mismatch'}, ERR)

class SearchQuery(APIView):
    def post(self, req):
        text = req.data['data']

        results = []
        videos = videoModels.Video.objects.filter(title__icontains=text)
        channels = models.Channel.objects.filter(user__username__icontains=text)
        
        if req.data['type'] == 'text':
            results.extend([x.title for x in videos])
            results.extend([x.user.username for x in channels])
        elif req.data['type'] == 'queryset':
            results.extend([{'obj': serializers.ChannelSerializer(x).data, 'type': 'channel'} for x in channels])
            results.extend([{'obj': VideoPreviewSerializer(x).data, 'type': 'video'} for x in videos])

        return Response({ 'data': results }, OK)