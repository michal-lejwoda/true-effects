from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from authorization.models import CustomUser

class ACHIEVEMENT_TYPES(models.TextChoices):
    SUM_MEASUREMENTS_ADDED = "SUM_MEASUREMENTS_ADDED", "Sum Measurements Added"
    SUM_USER_GOALS_ADDED = "SUM_USER_GOALS_ADDED", "Sum User Goals Added"
    SUM_EXERCISE_CREATED = "SUM_EXERCISE_CREATED", "Sum Exercise Created"
    SUM_TRAININGS_CREATED = "SUM_TRAININGS_CREATED", "Sum Trainings Created"
    SUM_TRAININGS_COMPLETED = "SUM_TRAININGS_COMPLETED", "Sum Trainings Completed"
    SUM_LOGGED_TIME = "SUM_LOGGED_TIME", "Sum Logged Time"
    LOGGED_TIME = "LOGGED_TIME", "Logged Time"
    SUM_USER_MODIFY_TRAINING = "SUM_USER_MODIFY_TRAINING", "Sum User Modify Training"


class TypeAchievement(models.Model):
    name = models.CharField(
        max_length=100,
        choices=ACHIEVEMENT_TYPES.choices,
        unique=True
    )

    def __str__(self):
        return self.get_name_display()


class Achievement(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="achievements/image/")
    type_achievement = models.ForeignKey(TypeAchievement, on_delete=models.CASCADE, blank=True, null=True)
    minutes = models.IntegerField(default=0, blank=True, null=True)
    message = models.TextField(default="")

    def save(self, *args, **kwargs):
        if not self.name or not self.description:
            raise ValueError(_("Fields 'name' and 'description' cannot be empty"))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class UserAchievement(models.Model):
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, null=False)
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

