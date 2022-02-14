from rest_framework import serializers
from . import models

class ChannelSerializer(serializers.ModelSerializer):
    user_data = serializers.ReadOnlyField(source='get_channel_user')
    created_at = serializers.DateTimeField(format="%B %d, %Y")

    class Meta:
        model = models.Channel
        fields = '__all__'