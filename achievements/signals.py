import json

import channels
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver

from achievements.models import SumLoggedInTime
from authorization.models import CustomUser
from training.models import Training

def send_message(event):
    print("send_message")
    message = event['text']
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.send)(text_data=json.dumps(
        message
    ))
@receiver(post_save, sender=CustomUser)
def create_sum_logged_in_time(sender, instance, created, **kwargs):
    if created:
        SumLoggedInTime.objects.create(user=instance)

@receiver(post_save, sender=Training)
def check_training_achievements(sender, instance, created, **kwargs):
    print("check_training_achievements")
    if created:
        print("instance.created_by", instance.user)
        user_trainings_count = Training.objects.filter(user=instance.user).count()
        print("user_trainings_count")
        print(user_trainings_count)
        channel_layer = get_channel_layer()
        print("channel_layer")
        print(channel_layer)
        print("important")
        print(f"user_{instance.user.id}")
        group_name = f"user_{instance.user.id}"
        print(group_name)
        message = {
            "message": "Creaeted training"
        }
        channel_layer = channels.layers.get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                'type': 'send_notifications',
                'text': message
            }
        )
        # async_to_sync(channel_layer.group_send)(
        #     f"user_{instance.user.id}",
        #     {
        #         'type': 'send_notification_v3',
        #         'message': 'Congratulations! You have created your first Training!'
        #     }
        # )
        print("koniec")


