from django.db import models
from users.models import cUser
from channels.models import Channel

class Video(models.Model):
    user = models.ForeignKey(cUser, on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=120)
    descritpion = models.CharField(max_length=512, default='')

    views = models.PositiveBigIntegerField(default=0)
    likes = models.PositiveBigIntegerField(default=0)
    dislikes = models.PositiveBigIntegerField(default=0)

    thumbnail = models.ImageField(upload_to='videos/thumbnails/')
    video = models.FileField(upload_to='videos/files/')
    
    created_at = models.DateTimeField(auto_now_add=True)

    def format_date(self):
        from django.utils.timesince import timesince
        return timesince(self.created_at, depth=1)

    def format_views(self):
        return f'{self.views:,}'
    def format_likes(self):
        return f'{self.likes:,}'
    def format_dislikes(self):
        return f'{self.dislikes:,}'

    def calculate_ratio(self):
        try:
            return ((self.likes - self.dislikes) / (self.likes + self.dislikes)).__round__(2)
        except:
            return 0

    def get_duration(self):
        from moviepy import editor

        return editor.VideoFileClip(self.video.path).duration

    def get_subscribers(self):
        return self.user.subscribers

    def increment_views(self):
        self.views += 1
        self.save()

    def delete(self, using=None, keep_parents=False):
        self.thumbnail.storage.delete(self.thumbnail.path)
        self.video.storage.delete(self.video.path)
        super().delete()