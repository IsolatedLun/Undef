from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import cUser
from channels.models import Channel

OK = status.HTTP_200_OK
ERR = status.HTTP_400_BAD_REQUEST

class Register(APIView):
    permission_classes = [AllowAny]

    def post(self, req):
        user_data = {'email_address': req.data['email_address'], 'username': req.data['username'],
            'password': req.data['password'], 'profile': req.data['profile']}
        channel_data = {'banner': req.data['banner'], 'channel_description': req.data['channel_description']}

        try:
            cUser.objects.create(data=user_data)
            Channel.objects.create(data=channel_data)

            return Response({'detail': 'user and channel created'}, OK)
        except Exception as e:
            return Response({'detail': e}, ERR)

            