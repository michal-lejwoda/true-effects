from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from app.serializers import RegistrationSerializer


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
        })


class Logout(APIView):
    def get(self, request):
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
            # error_list = [serializer.errors[error][0].title() for error in serializer.errors]
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
