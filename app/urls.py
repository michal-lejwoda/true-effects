from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView

urlpatterns=[
    path('display_exercises/',views.exerciseView,name="exercise-view"),
    path('create_exercise/',views.exerciseCreate,name="create_exercise"),
    path('register/',views.registration_view,name='register'),
    # path('login/',obtain_auth_token,name="login"),
    path('login/', views.CustomAuthToken.as_view()),
    path('create_personal_dimensions/',views.createpersonalDimensions,name="createpersonalDimensions"),
    path('display_personal_dimensions/',views.displaypersonalDimensions,name="drisplaypersonalDimensions"),
    path('logout/', views.Logout.as_view()),
    path('create_training/',views.createTraining,name="create_training"),
    path('display_training/',views.displayTraining,name="display_training"),
    path('create_own_exercise/',views.createOwnExercise,name="create_own_exercise"),
    path('display_own_exercise/',views.displayOwnExercise,name="display_own_exercise"),
    path('create_personal_goals/',views.createPersonalGoals,name="create_personal_goals"),
    path('display_personal_goals/',views.displayPersonalGoals,name="display_personal_goals"),
    path('create_personal_goals/',views.createPersonalResults,name="create_personal_results"),
    path('display_personal_goals/',views.displayPersonalResults,name="display_personal_results"),
    path('display_single_series/',views.displaySingleSeries,name="display_single_series"),
    path('create_single_series/',views.createSingleSeries,name="create_single_series"),
    path('display_description_goals/',views.displayDescriptionGoals,name="display_description_goals"),
    path('create_description_goals/',views.createDescriptionGoals,name="display_description_goals"),
    path('update_training/',views.updateTraining,name="update_training"),
    path('delete_goals/<str:pk>',views.deleteGoals,name="delete_goals"),
    path('delete_measurement/<str:pk>',views.deleteMeasurement,name="delete_measurement"),
    path('delete_training/<str:pk>',views.deleteTraining,name="delete_training"),
    path('update_training_date/<str:pk>',views.updatedateofTraining,name="update_date_of_training"),
    path('update_training_after_end/<str:pk>',views.updateTrainingafterEnd,name="update_training_after_end"),
    path('overview/',views.apiOverview),
]
#createTraining
#displayTraining
#createOwnExercise
#displayOwnExercise
#createPersonalGoals
#displayPersonalGoals
#createPersonalResults
#displayPersonalResults
#createpersonalDimensions
#displaypersonalDimensions