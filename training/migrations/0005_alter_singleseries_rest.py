# Generated by Django 3.2.23 on 2023-12-28 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0004_auto_20231228_0830'),
    ]

    operations = [
        migrations.AlterField(
            model_name='singleseries',
            name='rest',
            field=models.IntegerField(default=10),
        ),
    ]