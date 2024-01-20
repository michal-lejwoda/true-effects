from django.contrib.auth.forms import PasswordChangeForm
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ViewSet

from authorization.serializers import RegistrationSerializer, ChangePasswordSerializer


class CustomAuthToken(ObtainAuthToken, GenericViewSet):
    def create(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response(user.return_login_dict_with_token)

class ChangePasswordViewSet(GenericViewSet):
    serializer_class = ChangePasswordSerializer

    # @action(detail=False, methods=['POST'])
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password1')
        if not user.check_password(old_password):
            return Response({'error': 'Stare hasło jest nieprawidłowe.'}, status=status.HTTP_400_BAD_REQUEST)
        form = PasswordChangeForm(user, {'old_password': old_password, 'new_password1': new_password, 'new_password2': new_password})
        if form.is_valid():
            user.set_password(new_password)
            user.save()
            return Response({'detail': 'Hasło zostało pomyślnie zmienione.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Proszę poprawić błędy w formularzu zmiany hasła.'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
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
