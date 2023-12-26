from rest_framework.routers import DefaultRouter

from app.auth_views import RegistrationViewSet, CustomAuthToken, LogoutViewSet

router = DefaultRouter()

router.register(r'register123', RegistrationViewSet, basename='register')
router.register(r'login123', CustomAuthToken, basename='login')
router.register(r'logout123', LogoutViewSet, basename='logout')