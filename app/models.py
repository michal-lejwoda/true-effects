from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.core.validators import int_list_validator,validate_comma_separated_integer_list
from django.contrib.postgres.fields import ArrayField
class Exercise(models.Model):
    name = models.CharField(max_length=100)
class AssumedReps(models.Model):
    assumedreps = models.IntegerField()
    def __str__(self):
        return str(self.assumedreps)
class Reps(models.Model):
    reps = models.IntegerField()
class AllSeries(models.Model):
    number_of_series = models.IntegerField()
    rest_after = models.IntegerField()
class PersonalExercise(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    name = models.ForeignKey(Exercise,on_delete=models.CASCADE)
    # ownexercisename = models.ForeignKey(OwnExercise,on_delete=models.CASCADE,default=None)
    reps = models.IntegerField()
    predicted_weight = models.FloatField(default=0,null=True)
    weight = models.FloatField(default=0)
    concentric_phase = models.IntegerField(default=0)
    eccentric_phase = models.IntegerField(default=0)
    pause_after_concentric_phase = models.IntegerField()
    pause_after_eccentric_phase = models.IntegerField()
    rest = models.IntegerField(default=60)

class PersonalDimensions(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    date = models.DateField(null=True)
    weight = models.FloatField(default=0)
    growth = models.FloatField(default=0)
    left_biceps = models.FloatField()
    right_biceps = models.FloatField()
    left_forearm = models.FloatField()
    right_forearm = models.FloatField()
    left_leg = models.FloatField()
    right_leg = models.FloatField()
    bodyfat = models.FloatField()
class PersonalResults(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    Pullups = models.IntegerField()
    Dips = models.IntegerField()
    Pushups = models.IntegerField()
    Squats = models.IntegerField()
class DescriptionGoals(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    description = models.CharField(max_length=100)
    date = models.DateField(null=True)
    completed = models.BooleanField(default=False)
class PersonalGoals(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    Pullups = models.IntegerField()
    Dips = models.IntegerField()
    Pushups = models.IntegerField()
    Other = models.CharField(max_length=255)
class OwnExercise(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class SingleSeries(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise,on_delete=models.CASCADE,default=None,blank=True, null=True)
    ownexercise = models.ForeignKey(OwnExercise,on_delete=models.CASCADE,default=None,blank=True, null=True)
    weight = models.FloatField()
    rest = models.IntegerField()
    concentric_phase = models.IntegerField(default=0)
    eccentric_phase = models.IntegerField(default=0)
    pause_after_concentric_phase = models.IntegerField()
    pause_after_eccentric_phase = models.IntegerField()
    reps = ArrayField(models.IntegerField(), blank=True)
class Training(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    name = models.CharField(max_length=100)
    training = models.ManyToManyField(SingleSeries)
    date = models.DateField(null=True)
    description = models.CharField(max_length=255,default='',null=True)
    time = models.TimeField(auto_now=False, auto_now_add=False,null=True,default='00:00:00')
@receiver(post_save,sender=User)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)