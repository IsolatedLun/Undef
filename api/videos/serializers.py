from rest_framework import serializers
from . import models

class VideoPreviewSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    profile =  serializers.ReadOnlyField(source='user.profile.url')

    class Meta:
        model = models.Video
        fields = ['id', 'thumbnail', 'title', 'views', 'user', 'username', 'profile']