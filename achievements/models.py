from django.db import models
from django.utils import timezone

from authorization.models import CustomUser

class TypeAchievement(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Achievement(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="achievements/image/")
    type_achievement = models.ForeignKey(TypeAchievement, on_delete=models.CASCADE, blank=True, null=True)
    minutes = models.IntegerField(default=0, blank=True, null=True)
    message = models.TextField(default="")

    def __str__(self):
        return self.name

class UserAchievement(models.Model):
    achievement = models.ForeignKey(Achievement,  null=True, on_delete=models.SET_NULL)
    is_earned = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='achievements')
    date_earned = models.DateTimeField(null=True, default=timezone.now())
    is_displayed_for_user = models.BooleanField(default=False)

    def __str__(self):
        return self.achievement.name

    class Meta:
        unique_together = ('achievement', 'user')
class UserModifyTraining(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    time = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} {self.time}"

class SumLoggedInTime(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    time = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} {self.time}"

