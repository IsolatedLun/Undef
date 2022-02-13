from django.db import models
from users.models import cUser

class Channel(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    banner = models.ImageField(upload_to='channels/banners/')

    channel_description = models.CharField(max_length=1028)
    bussiness_email = models.EmailField(max_length=128)

    created_at = models.DateTimeField(auto_now_add=True)