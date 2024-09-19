from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_extensions.db.models import TimeStampedModel
from authorization.models import CustomUser


class Exercise(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    public = models.BooleanField(default=False)
    popularity = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class SingleSeries(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, default=None, blank=True, null=True)
    extra_weight = models.FloatField(default=0)
    rest = models.IntegerField(default=10)
    concentric_phase = models.IntegerField(default=0)
    eccentric_phase = models.IntegerField(default=0)
    pause_after_concentric_phase = models.IntegerField(default=0)
    pause_after_eccentric_phase = models.IntegerField(default=0)
    reps = models.IntegerField()
    series_num = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Single Series"
        ordering = ["id"]
    def __str__(self):
        return f"{self.user.username} {self.exercise.name} {self.series_num}"


class MultiSeries(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, default=None, blank=True, null=True)
    single_series = models.ManyToManyField(SingleSeries)
    series_num = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Multi Series"
        ordering = ["id"]
    def __str__(self):
        return f"{self.user.username} {self.exercise.name} {self.series_num}"



class Training(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=100)
    multi_series = models.ManyToManyField(MultiSeries, blank=True)
    date = models.DateField(null=True)
    description = models.TextField(null=True, blank=True)
    time = models.TimeField(auto_now=False, auto_now_add=False, null=True, default='00:00:00')

    def __str__(self):
        return f"{self.user.username} {self.name} {self.date}"


class UserGoal(TimeStampedModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    goal = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    finish_date = models.DateField(null=False)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} {self.goal}"

class UserDimension(TimeStampedModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None)
    date = models.DateField(null=True)
    weight = models.FloatField(null=True, blank=True)
    growth = models.FloatField(null=True, blank=True)
    left_biceps = models.FloatField(null=True, blank=True)
    right_biceps = models.FloatField(null=True, blank=True)
    left_forearm = models.FloatField(null=True, blank=True)
    right_forearm = models.FloatField(null=True, blank=True)
    left_leg = models.FloatField(null=True, blank=True)
    right_leg = models.FloatField(null=True, blank=True)
    bodyfat = models.FloatField(null=True, blank=True)


class UserDimensionConfiguration(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    weight = models.BooleanField(default=True)
    growth = models.BooleanField(default=False)
    left_biceps = models.BooleanField(default=True)
    right_biceps = models.BooleanField(default=True)
    left_forearm = models.BooleanField(default=True)
    right_forearm = models.BooleanField(default=True)
    left_leg = models.BooleanField(default=True)
    right_leg = models.BooleanField(default=True)
    bodyfat = models.BooleanField(default=False)

"""Signals"""
@receiver(post_save, sender=CustomUser)
def create_user_dimension_configuration(sender, instance=None, created=False, **kwargs):
    if created:
        UserDimensionConfiguration.objects.create(user=instance)