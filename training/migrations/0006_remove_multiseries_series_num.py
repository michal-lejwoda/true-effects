# Generated by Django 3.2.23 on 2023-12-28 08:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0005_alter_singleseries_rest'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='multiseries',
            name='series_num',
        ),
    ]
