from rest_framework import serializers
from . import models

class VideoSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    profile =  serializers.ReadOnlyField(source='user.profile.url')
    created_at = serializers.ReadOnlyField(source='format_date')
    duration = serializers.ReadOnlyField(source='get_duration')
    ratio = serializers.ReadOnlyField(source='calculate_ratio')
    views = serializers.ReadOnlyField(source='format_views')
    likes = serializers.ReadOnlyField(source='format_likes')
    dislikes = serializers.ReadOnlyField(source='format_dislikes')
    subscribers = serializers.ReadOnlyField(source='get_subscribers')

    class Meta:
        model = models.Video
        fields = '__all__'

class VideoEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Video
        fields = ['id', 'user', 'thumbnail', 'title', 'description', 'visibility']

class VideoPreviewSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    profile =  serializers.ReadOnlyField(source='user.profile.url')
    created_at = serializers.ReadOnlyField(source='format_date')
    views = serializers.ReadOnlyField(source='format_views')

    class Meta:
        model = models.Video
        fields = ['id', 'thumbnail', 'title', 'views', 'user', 'channel',
            'username', 'profile', 'created_at']

class VideoCommentSerializer(serializers.ModelSerializer):
    created_at = serializers.ReadOnlyField(source='format_date')
    profile = serializers.ReadOnlyField(source='get_profile')
    username = serializers.ReadOnlyField(source='get_username')

    class Meta:
        model = models.Comment
        fields = '__all__'