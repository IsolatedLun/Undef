from django.db import models
from users import models as userModels

class Video(models.Model):
    user = models.ForeignKey(userModels.cUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)

    views = models.PositiveBigIntegerField(default=0)
    likes = models.PositiveBigIntegerField(default=0)
    dislikes = models.PositiveBigIntegerField(default=0)

    thumbnail = models.ImageField(upload_to='videos/thumbnails/')
    video = models.FileField(upload_to='videos/files/')
    
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def format_date(self):
        from django.utils.timesince import timesince
        return timesince(self.created_at, depth=1)

    def delete(self, using=None, keep_parents=False):
        self.thumbnail.storage.delete(self.thumbnail.path)
        self.video.storage.delete(self.video.path)
        super().delete()