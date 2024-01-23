# Generated by Django 3.2.23 on 2023-12-28 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0003_alter_exercise_popularity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='multiseries',
            name='single_series',
        ),
        migrations.AddField(
            model_name='multiseries',
            name='single_series',
            field=models.ManyToManyField(to='training.SingleSeries'),
        ),
        migrations.AlterField(
            model_name='singleseries',
            name='extra_weight',
            field=models.FloatField(default=0),
        ),
    ]