from django.db import models
from users.models import cUser
from users.serializers import cUserChannelSerializer

class Channel(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    banner = models.ImageField(upload_to='channels/banners/')

    channel_description = models.CharField(max_length=1028)
    business_email = models.EmailField(max_length=128)

    total_views = models.PositiveBigIntegerField(default=0);

    created_at = models.DateTimeField(auto_now_add=True)

    def get_channel_user(self):
        return cUserChannelSerializer(self.user).data

    def format_date(self):
        from django.utils.timesince import timesince
        return timesince(self.created_at, depth=2)

    def delete(self, using=None, keep_parents=False):
        self.banner.storage.delete(self.banner.path)
        super().delete()