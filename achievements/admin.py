from django.contrib import admin

from achievements.models import Achievement, UserAchievement, TypeAchievement, SumLoggedInTime

# Register your models here.
admin.site.register(Achievement)
admin.site.register(UserAchievement)
admin.site.register(TypeAchievement)
admin.site.register(SumLoggedInTime)