from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class cUserManager(BaseUserManager):
    def create_user(self, email_address, password, **others):
        email_address = self.normalize_email(email_address)
        user = self.model(email_address=email_address, **others)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email_address, password, **others):
        others.setdefault('is_active', True)
        others.setdefault('is_superuser', True)
        others.setdefault('is_staff', True)

        return self.create_user(email_address, password, **others)

class cUser(AbstractUser):
    username = models.CharField(max_length=72, unique=True, default='')
    email_address = models.EmailField(max_length=128, unique=True)
    password = models.CharField(max_length=128)

    subscribers = models.PositiveBigIntegerField(default=0)

    profile = models.ImageField(upload_to='profiles/', default='profiles/def.png')

    joined_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email_address'
    REQUIRED_FIELDS = []

    objects = cUserManager()

    def get_channel_id(self):
        from channels.models import Channel

        return Channel.objects.get(user_id=self.id).id 

    def delete(self, using=None, keep_parents=False):
        self.profile.storage.delete(self.profile.path)
        super().delete()

class Notification(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    video = models.ForeignKey('videos.Video', on_delete=models.CASCADE)
    
    read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def format_date(self):
        from django.utils.timesince import timesince
        return timesince(self.created_at, depth=1)

    def get_video_details(self):
        data = {
            'profile': self.video.user.profile.url,
            'title': self.video.title,
        }

        return data