import channels
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone, translation

from achievements.models import SumLoggedInTime, UserModifyTraining, Achievement, UserAchievement
from authorization.models import CustomUser
from training.models import Training, UserDimension, UserGoal, Exercise
from django.utils.translation import gettext as _

@receiver(post_save, sender=CustomUser)
def create_sum_logged_in_time(sender, instance, created, **kwargs):
    if created:
        SumLoggedInTime.objects.get_or_create(user=instance)
        UserModifyTraining.objects.get_or_create(user=instance)

@receiver(post_save, sender=Training)
def check_training_achievements(sender, instance, created, **kwargs):
    group_name = f"user_{instance.user.id}"
    if created:
        achievements = list(Achievement.objects.filter(
            type_achievement__name='SUM_TRAININGS_COMPLETED'
        ).exclude(
            id__in=UserAchievement.objects.filter(user=instance.user).values_list('achievement_id', flat=True)
        ).order_by('minutes').values())

        training_count = Training.objects.filter(user=instance.user).count()

        for achievement in achievements:
            if training_count >= achievement['minutes']:
                try:
                    achievement_instance = Achievement.objects.get(id=achievement['id'])
                    UserAchievement(
                        user=instance.user,
                        achievement=achievement_instance,
                        is_earned=True,
                        date_earned=timezone.now()
                    ).save()
                    message = {
                        "message": achievement['message']
                    }
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        group_name,
                        {
                            'type': 'send_notifications',
                            'text': message
                        }
                    )
                except Achievement.DoesNotExist:
                    print(f'Achievement with id {achievement["id"]} does not exist.')
                except Exception as e:
                    print(f'Error occurred: {e}')
    else:
        user_modify, created = UserModifyTraining.objects.get_or_create(user=instance.user)
        user_modify.time += 1
        user_modify.save()

#TODO Uncomment
# @receiver(post_save, sender=UserModifyTraining)
# def check_user_modify_training(sender, instance, created, **kwargs):
#     if created:
#         group_name = f"user_{instance.user.id}"
#         achievements = list(Achievement.objects.filter(type_achievement__name='SUM_USER_MODIFY_TRAINING').exclude(
#             id__in=UserAchievement.objects.filter(user=instance.user).values_list('achievement_id', flat=True)
#         ).order_by('minutes').values())
#         counted_modify_training = UserModifyTraining.objects.filter(user=instance.user).count()
#         for achievement in achievements:
#             if counted_modify_training >= achievement.minutes:
#                 message = {
#                     "message": "Updated training"
#                 }
#                 channel_layer = channels.layers.get_channel_layer()
#                 async_to_sync(channel_layer.group_send)(
#                     group_name,
#                     {
#                         'type': 'send_notifications',
#                         'text': message
#                     }
#                 )



@receiver(post_save, sender=UserDimension)
def check_user_dimension_achievements(sender, instance, created, **kwargs):
    if created:
        UserDimension.objects.filter(user=instance.user).count()
        group_name = f"user_{instance.user.id}"
        message = {
            "message": "Creaeted dimension"
        }
        channel_layer = channels.layers.get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                'type': 'send_notifications',
                'text': message
            }
        )


@receiver(post_save, sender=UserGoal)
def check_user_goal_achievements(sender, instance, created, **kwargs):
    if created:
        UserGoal.objects.filter(user=instance.user).count()
        group_name = f"user_{instance.user.id}"
        message = {
            "message": _("Created goal")
        }
        channel_layer = channels.layers.get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                'type': 'send_notifications',
                'text': message
            }
        )
@receiver(post_save, sender=UserGoal)
def check_exercise_achievements(sender, instance, created, **kwargs):
    if created:
        Exercise.objects.filter(user=instance.user).count()
        group_name = f"user_{instance.user.id}"
        message = {
            "message": "Creaeted exercise"
        }
        channel_layer = channels.layers.get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                'type': 'send_notifications',
                'text': message
            }
        )


