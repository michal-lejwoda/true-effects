# Generated by Django 3.2.23 on 2023-12-28 08:51

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('training', '0010_userdimensions_usergoals'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserDimensions',
            new_name='UserDimension',
        ),
        migrations.RenameModel(
            old_name='UserGoals',
            new_name='UserGoal',
        ),
        migrations.RenameField(
            model_name='usergoal',
            old_name='description',
            new_name='goal',
        ),
    ]