from rest_framework.routers import DefaultRouter

from app.auth_views import RegistrationViewSet

router = DefaultRouter()

router.register(r'register123', RegistrationViewSet, basename='register')