from django.contrib.auth.forms import PasswordChangeForm
from django.core.validators import validate_email
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from achievements.choices import LANGUAGES
from achievements.models import Achievement
from authorization.models import CustomUser
from django.utils.translation import gettext as _

#TODO Translate
class AchievementSerializer(serializers.ModelSerializer):
    earned = serializers.BooleanField()
    date_earned = serializers.DateTimeField()

    class Meta:
        model = Achievement
        fields = ['id', 'name', 'description', 'earned', 'date_earned', 'image', 'type_achievement']

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
            raise serializers.ValidationError(_("Password is too short (min 4 letters)"))

        if len(password) > 50:
            raise serializers.ValidationError(_("Password is too long (max 50 letters)"))
        return password

    @staticmethod
    def validate_username(username):
        if len(username) < 4:
            raise serializers.ValidationError(_("Username is too short (min 4 letters)"))

        if len(username) > 30:
            raise serializers.ValidationError(_("Username is too long (max 30 letters)"))
        return username

    @staticmethod
    def validate_email(email):
        try:
            validate_email(email)
        except:
            raise serializers.ValidationError({'email': _("Address email is invalid")})
        return email
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': _('Passwords do not match')})
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
        except Token.DoesNotExist:
            raise serializers.ValidationError({"token": _("Token is invalid")})
        if token.user.email != data['email']:
            raise serializers.ValidationError({"email": _("Address email is invalid")})
        if data['new_password1'] != data['new_password2']:
            raise serializers.ValidationError({"new_password2": _("Passwords do not match")})
        data['user'] = token.user
        return data