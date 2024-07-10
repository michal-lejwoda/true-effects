from django.db import models
from authorization.models import CustomUser


class Achievement(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="achievements/image/")

    def __str__(self):
        return self.name

class UserAchievement(models.Model):
    achievement = models.ForeignKey(Achievement,  null=True, on_delete=models.SET_NULL)
    is_earned = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='achievements')
    date_earned = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return self.achievement.name