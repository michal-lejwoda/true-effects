from django.contrib.auth.forms import PasswordChangeForm
from django.core.validators import validate_email
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from achievements.choices import LANGUAGES
from achievements.models import Achievement
from authorization.models import CustomUser

class AchievementSerializer(serializers.ModelSerializer):
    earned = serializers.BooleanField()

    class Meta:
        model = Achievement
        fields = ['id', 'name', 'description', 'earned', 'image', 'type_achievement']

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'password2')
        write_only_fields = ('password')
        read_only_fields = ('id',)
        extra_kwargs = {'email': {'required': True}}

    @staticmethod
    def validate_password(password):
        if len(password) < 4:
            raise serializers.ValidationError('Hasło za krótkie (minimum 4 litery)')

        if len(password) > 50:
            raise serializers.ValidationError('Hasło za długie (maksimum 50 liter)')
        return password
    @staticmethod
    def validate_username(username):
        if len(username) < 4:
            raise serializers.ValidationError('Nazwa użytkowanika jest za krótka (minimum 4 litery)')

        if len(username) > 30:
            raise serializers.ValidationError('Nazwa użytkowanika jest za długa (maksimum 30 liter)')
        return username

    @staticmethod
    def validate_email(email):
        try:
            validate_email(email)
        except:
            raise serializers.ValidationError({'email': 'Email jest nie poprawny'})
        return email
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Hasła się nie zgadzają'})
        return data
    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user.return_dict_data_with_token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id',)

class ChangeLanguageSerializer(serializers.Serializer):
    language = serializers.ChoiceField(choices=LANGUAGES)

class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','default_language')

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password1 = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate(self, data):
        form = PasswordChangeForm(self.context['request'].user, data)

        if form.is_valid():
            return data
        else:
            raise serializers.ValidationError(form.errors)

class ChangePasswordWithTokenSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    new_password1 = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate(self, data):
        try:
            token = Token.objects.get(key__exact=data['token'])
            if token.user.email != data['email']:
                raise serializers.ValidationError()
            if data['new_password1'] != data['new_password2']:
                raise serializers.ValidationError()
            data['user'] = token.user
            return data
        except Token.DoesNotExist:
            raise serializers.ValidationError()