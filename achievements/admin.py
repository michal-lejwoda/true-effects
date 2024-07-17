from django.contrib import admin

from achievements.models import Achievement, UserAchievement, TypeAchievement, SumLoggedInTime, UserModifyTraining


admin.site.register(Achievement)
admin.site.register(UserAchievement)
admin.site.register(TypeAchievement)
admin.site.register(SumLoggedInTime)
admin.site.register(UserModifyTraining)