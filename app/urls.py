# from django.urls import path, include
# from .api.api_router import router
# from . import views
#
# urlpatterns=[
#     path('v1/',include(router.urls)),
#     path('display_exercises/',views.exercise_view,name="exercise-view"),
#     path('create_exercise/',views.exercise_create,name="create_exercise"),
#     path('register/',views.registration_view,name='register'),
#     path('login/', views.CustomAuthToken.as_view()),
#     path('create_personal_dimensions/',views.create_personal_dimensions,name="create_personal_Dimensions"),
#     path('display_personal_dimensions/',views.display_personal_dimensions,name="display_personal_Dimensions"),
#     path('logout/', views.Logout.as_view()),
#     path('create_training/',views.create_training,name="create_training"),
#     path('display_training/',views.display_training,name="display_training"),
#     path('create_own_exercise/',views.create_own_exercise,name="create_own_exercise"),
#     path('display_own_exercise/',views.display_own_exercise,name="display_own_exercise"),
#     path('create_personal_goals/',views.create_personal_goals,name="create_personal_goals"),
#     path('display_personal_goals/',views.display_personal_goals,name="display_personal_goals"),
#     path('display_single_series/',views.display_single_series,name="display_single_series"),
#     path('create_single_series/',views.create_single_series,name="create_single_series"),
#     path('display_description_goals/',views.display_description_goals,name="display_description_goals"),
#     path('create_description_goals/',views.create_description_goals,name="create_description_goals"),
#     # path('update_training/',views.updateTraining,name="update_training"),
#     path('delete_goals/<str:pk>',views.delete_goals,name="delete_goals"),
#     path('delete_measurement/<str:pk>',views.delete_measurement,name="delete_measurement"),
#     path('delete_training/<str:pk>',views.delete_training,name="delete_training"),
#     path('update_training_date/<str:pk>',views.update_date_of_training,name="update_date_of_training"),
#     path('update_training_after_end/<str:pk>',views.update_training_after_end,name="update_training_after_end"),
# ]