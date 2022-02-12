from rest_framework import serializers
from . import models

class VideoSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    profile =  serializers.ReadOnlyField(source='user.profile.url')
    created_at = serializers.ReadOnlyField(source='format_date')
    duration = serializers.ReadOnlyField(source='get_duration')

    class Meta:
        model = models.Video
        fields = '__all__'

class VideoPreviewSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    profile =  serializers.ReadOnlyField(source='user.profile.url')
    created_at = serializers.ReadOnlyField(source='format_date')
    ratio = serializers.ReadOnlyField(source='calculate_ratio')
    

    class Meta:
        model = models.Video
        fields = ['id', 'thumbnail', 'title', 'views', 'user', 'username', 'profile', 'created_at',
            'ratio']