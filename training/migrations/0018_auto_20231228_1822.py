# Generated by Django 3.2.23 on 2023-12-28 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0017_alter_usergoal_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usergoal',
            old_name='date',
            new_name='finish_date',
        ),
        migrations.AddField(
            model_name='usergoal',
            name='created_date',
            field=models.DateField(null=True),
        ),
    ]
