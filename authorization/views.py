from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ViewSet

from authorization.serializers import RegistrationSerializer


class CustomAuthToken(ObtainAuthToken, GenericViewSet):
    def create(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response(user.return_login_dict_with_token)


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
