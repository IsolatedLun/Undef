from django.db import IntegrityError
from jwt import ExpiredSignatureError
from rest_framework.views import APIView, Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from users.models import Notification
import users.models as userModels
from . import serializers
import channels.models as channelModels
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken
from jwt import decode
from django.conf import settings

OK = status.HTTP_200_OK
ERR = status.HTTP_400_BAD_REQUEST

def decode_user_id(request_header):
    try:
        token = request_header['Authorization'].split(' ')[1]
        return decode(jwt=str(token), key=settings.SECRET_KEY, algorithms=['HS256'])['user_id']
    except:
        return None

def clean_integrity_error(err):
    def prettify(s):
        return ' '.join([x.capitalize() for x in s.split('_')])

    err = str(err)
    return prettify(err.split('.')[1])

class Register(APIView):
    permission_classes = [AllowAny]

    def post(self, req):
        user_data = {'email_address': req.data['email_address'], 'username': req.data['username'],
            'password': make_password(req.data['password']), 'profile': req.data['profile']}
        channel_data = {'banner': req.data['banner'], 'channel_description': req.data['channel_description']}

        try:
            user, created = userModels.cUser.objects.get_or_create(**user_data)

            if created:
                channelModels.Channel.objects.create(**channel_data, user=user)
            else:
                raise Exception('User already exists')

            return Response({'detail': 'user and channel created'}, OK)
        except IntegrityError as e:
            return Response({'detail': 
                f'An account with the same \'{clean_integrity_error(e)}\' already exists.'}, ERR)

class JWTLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, req):
        try:
            user = userModels.cUser.objects.get(email_address=req.data['email_address'])
            
            if not check_password(req.data['password'], user.password):
                raise Exception()

            refresh = RefreshToken.for_user(user)
            

            return Response({
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user': serializers.cUserChannelSerializer(user).data
            }, OK)
        except Exception as e:
            print(e)
            return Response({ 'detail': 'Invalid email or password.' }, ERR)

class JWTCredentials(APIView):
    permission_classes = [AllowAny]
    
    def get(self, req):
        id = decode_user_id(req.headers)

        try:
            user = serializers.cUserSerializer(userModels.cUser.objects.get(id=id)).data
            return Response({'data': user}, OK)
        except ExpiredSignatureError:
            return Response({'detail': 'expired'}, ERR)
        except Exception:
            return Response({'detail': 'User is not logged'}, ERR)

# ==============
# Notifications
# ==============
class NotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, req):
        user_id = decode_user_id(req.headers)

        notifications = Notification.objects.filter(user__id=user_id)
        serializer = serializers.NotificationSerializer(notifications, many=True).data

        return Response(data=serializer, status=OK)