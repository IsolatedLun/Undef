from rest_framework import serializers
from . import models

class cUserSerializer(serializers.ModelSerializer):
    channel_id = serializers.ReadOnlyField(source='get_channel_id')

    class Meta:
        model = models.cUser
        fields = '__all__'

class cUserChannelSerializer(serializers.ModelSerializer):
    channel_id = serializers.ReadOnlyField(source='get_channel_id')

    class Meta:
        model = models.cUser
        fields = ['id', 'username', 'profile', 'subscribers', 'channel_id']

class NotificationSerializer(serializers.ModelSerializer):
    video_data = serializers.ReadOnlyField(source='get_video_details')
    created_at = serializers.ReadOnlyField(source='format_date');

    class Meta:
        model = models.Notification
        fields = '__all__'