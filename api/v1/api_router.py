from rest_framework.routers import DefaultRouter

from authorization.views import RegistrationViewSet, CustomAuthToken, LogoutViewSet, ChangePasswordViewSet, \
    PasswordChangeWithToken, ChangeDefaultLanguage, GetUserViewSet, ConfirmAchievementViewSet, AchievementViewSet
from training.views import ExerciseViewSet, UserDimensionViewSet, UserGoalViewSet, TrainingViewSet, \
    UserDimensionConfigurationViewSet, SingleTrainingViewSet, SingleSeriesViewSet, SendMail

router = DefaultRouter()

router.register(r'register', RegistrationViewSet, basename='register')
router.register(r'login', CustomAuthToken, basename='login')
router.register(r'get_user', GetUserViewSet, basename='get_user')
router.register(r'change_password', ChangePasswordViewSet, basename='change_password')
router.register(r'logout', LogoutViewSet, basename='logout'),
router.register(r'exercise', ExerciseViewSet, basename='exercise')
router.register(r'user_dimension', UserDimensionViewSet, basename='userdimension')
router.register(r'user_goal', UserGoalViewSet, basename='usergoal')
router.register(r'trainings', TrainingViewSet, basename='trainings')
router.register(r'single_series', SingleSeriesViewSet, basename='single_series')
router.register(r'single_training', SingleTrainingViewSet, basename='single_training')
router.register(r'user_dimension_configuration', UserDimensionConfigurationViewSet,
                basename='user_dimension_configuration')
router.register(r'password_change_with_token', PasswordChangeWithToken, basename='password_change_with_token')
router.register(r'change_default_language', ChangeDefaultLanguage, basename='change_default_language')
router.register(r'send_mail', SendMail, basename='send_mail')
router.register(r'confirm_achievement', ConfirmAchievementViewSet, basename='confirm_achievement')
router.register(r'achievements', AchievementViewSet, basename='achievements')
