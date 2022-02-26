from jwt import ExpiredSignatureError
from rest_framework.views import APIView, Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import cUser
from . import serializers
from channels.models import Channel
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken

OK = status.HTTP_200_OK
ERR = status.HTTP_400_BAD_REQUEST

class Register(APIView):
    permission_classes = [AllowAny]

    def post(self, req):
        user_data = {'email_address': req.data['email_address'], 'username': req.data['username'],
            'password': make_password(req.data['password']), 'profile': req.data['profile']}
        channel_data = {'banner': req.data['banner'], 'channel_description': req.data['channel_description']}

        try:
            user, created = cUser.objects.get_or_create(**user_data)

            if created:
                Channel.objects.create(**channel_data, user=user)
            else:
                raise Exception('User already exists')

            return Response({'detail': 'user and channel created'}, OK)
        except Exception as e:
            return Response({'detail': str(e)}, ERR)

class JWTLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, req):
        user = cUser.objects.get(email_address=req.data['email_address'])
        refresh = RefreshToken.for_user(user)
        

        return Response({
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'user': serializers.cUserChannelSerializer(user).data
        }, OK)

class JWTCredentials(APIView):
    permission_classes = [AllowAny]
    
    def get(self, req):
        from jwt import decode
        from django.conf import settings

        try:
            token = req.headers['Authorization'].split(' ')[1]
            payload = decode(jwt=str(token), key=settings.SECRET_KEY, algorithms=['HS256'])

            user = serializers.cUserSerializer(cUser.objects.get(id=payload['user_id'])).data
            return Response({'data': user}, OK)
        except ExpiredSignatureError:
            return Response({'detail': 'expired'}, ERR)