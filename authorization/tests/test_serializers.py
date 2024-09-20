import io
from datetime import datetime

from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIRequestFactory

from achievements.models import TypeAchievement
from authorization.models import CustomUser
from authorization.serializers import ChangePasswordWithTokenSerializer, ChangePasswordSerializer, \
    AchievementSerializer, RegistrationSerializer


class AchievementSerializerTest(APITestCase):
    def setUp(self):
        self.type_achievement = TypeAchievement.objects.create(name='Test Type')

        image = Image.new('RGB', (100, 100))
        image_io = io.BytesIO()
        image.save(image_io, format='JPEG')
        image_io.seek(0)

        self.image_file = SimpleUploadedFile(
            name='test_image.jpg',
            content=image_io.getvalue(),
            content_type='image/jpeg'
        )

        self.achievement_data = {
            'name': 'First Achievement',
            'description': 'Achievement description',
            'earned': True,
            'date_earned': datetime.now(),
            'image': self.image_file,
            'type_achievement': self.type_achievement.id,
        }

    def test_achievement_serializer_valid(self):
        serializer = AchievementSerializer(data=self.achievement_data)
        serializer.is_valid()
        self.assertTrue(serializer.is_valid())

    def test_achievement_serializer_invalid(self):
        invalid_data = self.achievement_data.copy()
        invalid_data['name'] = ''
        serializer = AchievementSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())


class RegistrationSerializerTest(APITestCase):
    def setUp(self):
        self.valid_user_data = {
            'username': 'validuser',
            'email': 'validuser@example.com',
            'password': 'validpassword',
            'password2': 'validpassword'
        }

    def test_registration_serializer_valid(self):
        serializer = RegistrationSerializer(data=self.valid_user_data)
        self.assertTrue(serializer.is_valid())

    def test_registration_serializer_invalid_password_mismatch(self):
        invalid_data = self.valid_user_data.copy()
        invalid_data['password2'] = 'differentpassword'
        serializer = RegistrationSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

    def test_registration_serializer_invalid_email(self):
        invalid_data = self.valid_user_data.copy()
        invalid_data['email'] = 'invalidemail'
        serializer = RegistrationSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_registration_serializer_create_user(self):
        serializer = RegistrationSerializer(data=self.valid_user_data)
        if serializer.is_valid():
            result = serializer.save()
            self.assertIn('response', result)
            self.assertIn('token', result)
            self.assertEqual(result['username'], self.valid_user_data['username'])
            self.assertEqual(result['email'], self.valid_user_data['email'])
            user_exists = CustomUser.objects.filter(username=self.valid_user_data['username']).exists()
            self.assertTrue(user_exists)
        else:
            self.fail("Serializer was expected to be valid.")


class ChangePasswordSerializerTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='oldpassword')
        self.client.force_authenticate(user=self.user)
        self.valid_password_data = {
            'old_password': 'oldpassword',
            'new_password1': 'djangopassword',
            'new_password2': 'djangopassword',
        }

    def test_change_password_serializer_valid(self):
        factory = APIRequestFactory()
        request = factory.post('/change-password/', {})
        request.user = self.user
        serializer = ChangePasswordSerializer(data=self.valid_password_data, context={'request': request})
        self.assertTrue(serializer.is_valid())

    def test_change_password_serializer_invalid_mismatch(self):
        factory = APIRequestFactory()
        request = factory.post('/change-password/', {})
        request.user = self.user

        serializer = ChangePasswordSerializer(data={'new_password1': 'newpass', 'new_password2': 'differentpass'},
                                              context={'request': request})

        self.assertFalse(serializer.is_valid())

    def test_change_password_serializer_invalid_old_password(self):
        factory = APIRequestFactory()
        request = factory.post('/change-password/', {})
        request.user = self.user
        data = {'old_password': 'wrong_old_password', 'new_password1': 'new_password', 'new_password2': 'new_password'}
        serializer = ChangePasswordSerializer(data=data, context={'request': request})
        self.assertFalse(serializer.is_valid())


class ChangePasswordWithTokenSerializerTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', email='testuser@example.com')
        Token.objects.filter(user=self.user).delete()
        self.token = Token.objects.create(user=self.user)
        self.valid_data = {
            'token': self.token.key,
            'email': self.user.email,
            'new_password1': 'newpassword',
            'new_password2': 'newpassword',
        }

    def tearDown(self):
        Token.objects.filter(user=self.user).delete()

    def test_change_password_with_token_serializer_valid(self):
        serializer = ChangePasswordWithTokenSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())

    def test_change_password_with_token_serializer_invalid_token(self):
        invalid_data = self.valid_data.copy()
        invalid_data['token'] = 'invalidtoken'
        serializer = ChangePasswordWithTokenSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('token', serializer.errors)

    def test_change_password_with_token_serializer_invalid_email(self):
        invalid_data = self.valid_data.copy()
        invalid_data['email'] = 'wrongemail@example.com'
        serializer = ChangePasswordWithTokenSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_change_password_with_token_serializer_password_mismatch(self):
        invalid_data = self.valid_data.copy()
        invalid_data['new_password2'] = 'differentpassword'
        serializer = ChangePasswordWithTokenSerializer(data=invalid_data)
        serializer.is_valid()
        self.assertFalse(serializer.is_valid())
        self.assertIn('new_password2', serializer.errors)
