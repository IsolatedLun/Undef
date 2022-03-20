from django.contrib import admin
from . import models

admin.site.register(models.cUser)
admin.site.register(models.Notification)