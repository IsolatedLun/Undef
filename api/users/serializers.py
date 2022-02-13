from rest_framework import serializers
from . import models

class cUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.cUser
        fields = '__all__'

class cUserChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.cUser
        fields = ['id', 'username', 'profile', 'subscribers']