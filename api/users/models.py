from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password

class cUserManager(BaseUserManager):
    def create_user(self, email, password, **others):
        email = self.normalize_email(email)
        user = self.model(email=email, **others)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, password, **others):
        others.setdefault('is_active', True)
        others.setdefault('is_superuser', True)
        others.setdefault('is_staff', True)

        return self.create_user(email, password, **others)

class cUser(AbstractUser):
    username = models.CharField(max_length=72, unique=True)
    email = models.EmailField(max_length=128, unique=True)
    password = models.CharField(max_length=128)

    subscribers = models.PositiveBigIntegerField(default=0)

    profile = models.ImageField(upload_to='profiles/', default='profiles/def.png')

    joined_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = cUserManager()

    def delete(self, using=None, keep_parents=False):
        self.profile.storage.delete(self.profile.path)
        super().delete()