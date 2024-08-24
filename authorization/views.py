from django.contrib.auth.forms import PasswordChangeForm
from django.db.models import Case, When, Value, BooleanField, OuterRef, Exists
from django.utils import timezone
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import PermissionDenied
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ViewSet

from achievements.models import UserAchievement, Achievement
from authorization.serializers import RegistrationSerializer, ChangePasswordSerializer, \
    ChangePasswordWithTokenSerializer, ChangeLanguageSerializer, GetUserSerializer, AchievementSerializer


class CustomAuthToken(ObtainAuthToken, GenericViewSet):
    def create(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        request.session['login_time'] = timezone.now().isoformat()
        return Response(user.return_login_dict_with_token)

class ChangeDefaultLanguage(GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangeLanguageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        user = request.user
        if serializer.is_valid():
            user.default_language = serializer.data['language']
            user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class GetUserViewSet(GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = GetUserSerializer

    def list(self, request):
        user = self.request.user
        serializer = self.serializer_class(user)
        return Response(serializer.data)

class ConfirmAchievementViewSet(GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        try:
            user_achievement = UserAchievement.objects.get(id=request.data['user_achievement_id'])
        except UserAchievement.DoesNotExist:
            return Response({'detail': 'User Achievement not found.'}, status=status.HTTP_404_NOT_FOUND)
        if user_achievement.user != request.user:
            raise PermissionDenied('You do not have permission to modify this achievement.')
        user_achievement.is_displayed_for_user = True
        user_achievement.save()
        return Response({'detail': 'Achievement activated successfully.'}, status=status.HTTP_200_OK)


class AchievementViewSet(GenericViewSet):
    permission_classes = (IsAuthenticated,)
    def list(self,request):
        user = self.request.user
        earned_subquery = UserAchievement.objects.filter(
            user=user,
            achievement=OuterRef('pk'),
            is_earned=True
        )

        achievements = Achievement.objects.annotate(
            earned=Exists(earned_subquery)
        ).order_by('type_achievement', 'minutes')
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data)



class ChangePasswordViewSet(GenericViewSet):
    serializer_class = ChangePasswordSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password1')
        if not user.check_password(old_password):
            return Response({'error': 'Stare hasło jest nieprawidłowe.'}, status=status.HTTP_400_BAD_REQUEST)
        form = PasswordChangeForm(user, {'old_password': old_password, 'new_password1': new_password,
                                         'new_password2': new_password})
        if form.is_valid():
            user.set_password(new_password)
            user.save()
            return Response({'detail': 'Hasło zostało pomyślnie zmienione.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Proszę poprawić błędy w formularzu zmiany hasła.'},
                            status=status.HTTP_400_BAD_REQUEST)


class PasswordChangeWithToken(GenericViewSet):
    serializer_class = ChangePasswordWithTokenSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data.get('user')
            new_password = serializer.validated_data.get('new_password1')
            user.set_password(new_password)
            user.save()
            return Response({'detail': 'Hasło zostało pomyślnie zmienione.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Niestety zmiana hasła się nie powiodła :('},
                            status=status.HTTP_400_BAD_REQUEST)


class LogoutViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        if 'login_time' in request.session:
            del request.session['login_time']
        request.user.auth_token.delete()
        return Response(data="Zostałeś wylogowany", status=status.HTTP_200_OK)


class RegistrationViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            test = serializer.save()
            return Response(test, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
