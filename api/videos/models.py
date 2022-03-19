from django.db import models
import users.models as userModels
from channels.models import Channel

video_choices = (

)

class Video(models.Model):
    class Visibility(models.IntegerChoices):
        PUBLIC = 1, 'Public'
        UNLISTED = 2, 'Unlisted'
        PRIVATE = 3, 'Private'
    
    user = models.ForeignKey(userModels.cUser, on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=512, default='')
    visibility = models.PositiveSmallIntegerField(choices=Visibility.choices, default=Visibility.PUBLIC)

    views = models.PositiveBigIntegerField(default=0)
    likes = models.BigIntegerField(default=0)
    dislikes = models.BigIntegerField(default=0)
    reports = models.BigIntegerField(default=0)

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
            return (self.likes  / (self.likes + self.dislikes)).__round__(2)
        except:
            return 0

    def get_duration(self):
        from moviepy import editor

        return editor.VideoFileClip(self.video.path).duration

    def get_subscribers(self):
        return self.user.subscribers

    def increment_views(self):
        self.views += 1
        self.channel.total_views += 1
        self.channel.save()
        self.save()

    def delete(self, using=None, keep_parents=False):
        self.thumbnail.storage.delete(self.thumbnail.path)
        self.video.storage.delete(self.video.path)
        super().delete()

class RatedVideo(models.Model):
    user = models.ForeignKey(userModels.cUser, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    rate_type = models.CharField(max_length=16, default='')

class Comment(models.Model):
    user = models.ForeignKey(userModels.cUser, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    text = models.CharField(max_length=512)

    created_at = models.DateTimeField(auto_now_add=True) 

    def format_date(self):
        from django.utils.timesince import timesince
        return timesince(self.created_at, depth=1)

    def get_profile(self):
        return self.user.profile.url

    def get_username(self):
        return self.user.username

    def get_comment_channel_id(self):
        from channels.models import Channel

        return Channel.objects.get(user__id=self.user.id).id