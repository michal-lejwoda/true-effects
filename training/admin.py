from django.contrib import admin
from .models import *

admin.site.register(Exercise)
admin.site.register(SingleSeries)
admin.site.register(MultiSeries)
admin.site.register(Training)
admin.site.register(UserGoal)
admin.site.register(UserDimension)
admin.site.register(UserDimensionConfiguration)