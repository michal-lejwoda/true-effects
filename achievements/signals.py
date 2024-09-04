from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver

from achievements.models import SumLoggedInTime, UserModifyTraining, Achievement, UserAchievement
from authorization.models import CustomUser
from training.models import Training, UserDimension, UserGoal, Exercise


def create_user_achievement(achievement, user):
    try:
        achievement_obj, created = UserAchievement.objects.get_or_create(
            achievement_id=achievement['id'],
            user=user,
            defaults={
                'is_earned': True,
                'user': user,
                'is_displayed_for_user': False
            }
        )
        message = {
            "user_achievement_id": achievement_obj.id,
            "message": achievement['message']
        }
        return message
    except Exception as e:
        return None


@receiver(post_save, sender=CustomUser)
def create_sum_logged_in_time(sender, instance, created, **kwargs):
    if created:
        SumLoggedInTime.objects.get_or_create(user=instance)
        UserModifyTraining.objects.get_or_create(user=instance)


@receiver(post_save, sender=Training)
def check_training_achievements(sender, instance, created, **kwargs):
    group_name = f"user_{instance.user.id}"
    type_achievement = 'SUM_TRAININGS_CREATED'
    if created:
        achievements = list(Achievement.objects.filter(
            type_achievement__name=type_achievement
        ).exclude(
            id__in=UserAchievement.objects.filter(user=instance.user).values_list('achievement_id', flat=True)
        ).order_by('minutes').values())
        training_count = Training.objects.filter(user=instance.user).count()
        for achievement in achievements:
            if training_count >= achievement['minutes']:
                try:
                    created_user_achievement = create_user_achievement(achievement, instance.user)
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        group_name,
                        {
                            'type': 'send_notifications',
                            "user_achievement_id": created_user_achievement["user_achievement_id"],
                            "message": created_user_achievement["message"]
                        }
                    )
                except Achievement.DoesNotExist:
                    pass
                except Exception:
                    pass
    else:
        user_modify, created = UserModifyTraining.objects.get_or_create(user=instance.user)
        user_modify.time += 1
        user_modify.save()


@receiver(post_save, sender=UserDimension)
def check_user_measurement_achievements(sender, instance, created, **kwargs):
    group_name = f"user_{instance.user.id}"
    type_achievement = "SUM_MEASUREMENTS_ADDED"
    if created:
        achievements = list(Achievement.objects.filter(
            type_achievement__name=type_achievement
        ).exclude(
            id__in=UserAchievement.objects.filter(user=instance.user).values_list('achievement_id', flat=True)
        ).order_by('minutes').values())
        user_measurements = UserDimension.objects.filter(user=instance.user).count()
        for achievement in achievements:
            if user_measurements >= achievement['minutes']:
                try:
                    created_user_achievement = create_user_achievement(achievement, instance.user)
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        group_name,
                        {
                            'type': 'send_notifications',
                            "user_achievement_id": created_user_achievement["user_achievement_id"],
                            "message": created_user_achievement["message"]
                        }
                    )
                except Exception:
                    pass


@receiver(post_save, sender=UserGoal)
def check_user_goal_achievements(sender, instance, created, **kwargs):
    group_name = f"user_{instance.user.id}"
    type_achievement = "SUM_USER_GOALS_ADDED"
    if created:
        achievements = list(Achievement.objects.filter(
            type_achievement__name=type_achievement
        ).exclude(
            id__in=UserAchievement.objects.filter(user=instance.user).values_list('achievement_id', flat=True)
        ).order_by('minutes').values())
        user_goal_count = UserGoal.objects.filter(user=instance.user).count()
        for achievement in achievements:
            if user_goal_count >= achievement['minutes']:
                try:
                    created_user_achievement = create_user_achievement(achievement, instance.user)
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        group_name,
                        {
                            'type': 'send_notifications',
                            "user_achievement_id": created_user_achievement["user_achievement_id"],
                            "message": created_user_achievement["message"]
                        }
                    )
                except Exception as e:
                    pass


@receiver(post_save, sender=Exercise)
def check_exercise_achievements(sender, instance, created, **kwargs):
    group_name = f"user_{instance.user.id}"
    type_achievement = 'SUM_EXERCISE_CREATED'
    if created:
        achievements = list(Achievement.objects.filter(
            type_achievement__name=type_achievement
        ).exclude(
            id__in=UserAchievement.objects.filter(user=instance.user).values_list('achievement_id', flat=True)
        ).order_by('minutes').values())
        exercise_count = Exercise.objects.filter(user=instance.user).count()
        for achievement in achievements:
            if exercise_count >= achievement['minutes']:
                try:
                    created_user_achievement = create_user_achievement(achievement, instance.user)
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        group_name,
                        {
                            'type': 'send_notifications',
                            "user_achievement_id": created_user_achievement["user_achievement_id"],
                            "message": created_user_achievement["message"]
                        }
                    )
                except Exception as e:
                    pass
