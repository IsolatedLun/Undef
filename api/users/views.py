from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import cUser
from . import serializers

OK = status.HTTP_200_OK
ERR = status.HTTP_400_BAD_REQUEST

class Register(APIView):
    permission_classes = [AllowAny]
    def post(self, req):
        user_data = {'email_address': req.data['email_address'], 'username': req.data['username'],
            'password': req.data['password'], 'profile': req.data['profile']}
        channel_data = {'banner': req.data['banner'], 'channel_description': req.data['channel_description']}

        try:
            user, created = cUser.objects.get_or_create(**user_data)

            if not created:
                Channel.objects.create(**channel_data, user= user)
            else:
                raise Exception('User already exists')

            return Response({'detail': 'user and channel created'}, OK)
        except Exception as e:
            return Response({'detail': e}, ERR)

class JWTView(APIView):
    def post(self, req):
        from rest_framework_simplejwt.tokens import RefreshToken
        user = cUser.objects.get(email_address=req.data['email_address'])
        refresh = RefreshToken.for_user(user)

        return Response({
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'user': serializers.cUserChannelSerializer(user).data
        }, OK)     