from rest_framework.routers import DefaultRouter

from authorization.views import RegistrationViewSet, CustomAuthToken, LogoutViewSet
from training.views import ExerciseViewSet, UserDimensionViewSet, UserGoalViewSet, TrainingViewSet, \
    UserDimensionConfigurationViewSet

router = DefaultRouter()

router.register(r'register', RegistrationViewSet, basename='register')
router.register(r'login', CustomAuthToken, basename='login')
router.register(r'logout', LogoutViewSet, basename='logout')
router.register(r'exercise', ExerciseViewSet, basename='exercise')
router.register(r'user_dimension', UserDimensionViewSet, basename='personal_dimensions')
router.register(r'user_goal', UserGoalViewSet, basename='personal_goals')
router.register(r'training', TrainingViewSet, basename='training')
router.register(r'user_dimension_configuration', UserDimensionConfigurationViewSet, basename='user_dimension_configuration')