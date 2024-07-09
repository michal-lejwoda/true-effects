from django.db import models

from authorization.models import CustomUser


# Create your models here.
class Achievement(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    is_earned = models.BooleanField(default=False)
    image = models.ImageField(upload_to="achievements/image/")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='achievements')
    date_earned = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return self.name