from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    @property
    def return_dict_data_with_token(self):
        token = Token.objects.get(user=self).key
        return {'response': "Poprawnie zarejestrowano użytkownika", 'email': self.email, 'username': self.username,
                'token': token}
    @property
    def return_login_dict_with_token(self):
        token, created = Token.objects.get_or_create(user=self)
        return {
            'token': token.key,
            'username': self.username,
        }

@receiver(post_save, sender=CustomUser)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)