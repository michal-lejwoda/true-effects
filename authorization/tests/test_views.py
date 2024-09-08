from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

from achievements.models import Achievement, UserAchievement, TypeAchievement


class CustomAuthTokenTest(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testuser', password='testpassword')
        self.token, created = Token.objects.get_or_create(user=self.user)
        self.client = APIClient()

    def tearDown(self):
        Token.objects.all().delete()
        get_user_model().objects.all().delete()

    def test_auth_token(self):
        response = self.client.post('/api/v1/login/', {'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.data)

    def test_auth_token_login_time(self):
        response = self.client.post('/api/v1/login/', {'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('login_time', self.client.session)


class ChangeDefaultLanguageTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_change_default_language(self):
        response = self.client.post('/api/v1/change_default_language/', {'language': 'en'})

        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.default_language, 'en')

    def test_change_default_language_invalid(self):
        response = self.client.post('/api/v1/change_default_language/', {'language': ''})
        self.assertEqual(response.status_code, 400)
#

class GetUserViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(username='testuser', email='testuser@example.com',
                                                         password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_get_user(self):
        response = self.client.get('/api/v1/get_user/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['default_language'], 'en')


class ConfirmAchievementViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.achievement = Achievement.objects.create(name='Test Achievement', description='Test Description')
        self.user_achievement = UserAchievement.objects.create(user=self.user, achievement=self.achievement,
                                                               is_earned=False)

    def test_confirm_achievement(self):
        response = self.client.post('/api/v1/confirm_achievement/', {'user_achievement_id': self.user_achievement.id})
        self.assertEqual(response.status_code, 200)
        self.user_achievement.refresh_from_db()
        self.assertTrue(self.user_achievement.is_displayed_for_user)

    def test_confirm_achievement_not_found(self):
        response = self.client.post('/api/v1/confirm_achievement/', {'user_achievement_id': 999})
        self.assertEqual(response.status_code, 404)

    def test_confirm_achievement_permission_denied(self):
        other_user = get_user_model().objects.create_user(username='otheruser', password='password',
                                                          email='otheruser@gmail.com')
        self.client.force_authenticate(user=other_user)
        response = self.client.post('/api/v1/confirm_achievement/', {'user_achievement_id': self.user_achievement.id})
        self.assertEqual(response.status_code, 403)


class AchievementViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.type_achievement = TypeAchievement.objects.create(name='Test Type')
        self.achievement = Achievement.objects.create(
            name='Test Achievement', description='Test Description', type_achievement=self.type_achievement)
        UserAchievement.objects.create(user=self.user, achievement=self.achievement, is_earned=True,
                                       date_earned=timezone.now())

    def test_list_achievements(self):
        response = self.client.get('/api/v1/achievements/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_achievements'], 1)
        self.assertEqual(response.data['earned_achievements_count'], 1)


class ChangePasswordViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(username='testuser', password='oldpassword')
        self.client.force_authenticate(user=self.user)

    def test_change_password_valid(self):
        response = self.client.patch('/api/v1/change_password/update/', {
            'old_password': 'oldpassword',
            'new_password1': 'djangoapppass',
            'new_password2': 'djangoapppass'
        })
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('djangoapppass'))

    def test_change_password_invalid_old_password(self):
        response = self.client.patch('/api/v1/change_password/update/', {
            'old_password': 'wrongpassword',
            'new_password1': 'newpassword',
            'new_password2': 'newpassword'
        })
        self.assertEqual(response.status_code, 400)

    def test_change_password_mismatch(self):
        response = self.client.patch('/api/v1/change_password/update/', {
            'old_password': 'oldpassword',
            'new_password1': 'newpassword1',
            'new_password2': 'newpassword2'
        })
        self.assertEqual(response.status_code, 400)


class PasswordChangeWithTokenTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(username='testuser', password='testpassword',
                                                         email='testemail@gmail.com')
        self.token, created = Token.objects.get_or_create(user=self.user)

    def test_change_password_with_token_valid(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token}')
        response = self.client.post('/api/v1/password_change_with_token/', {
            'token': self.token,
            'email': "testemail@gmail.com",
            'new_password1': 'newpassword',
            'new_password2': 'newpassword'
        })

        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('newpassword'))

    def test_change_password_with_token_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token invalidtoken')
        response = self.client.post('/api/v1/password_change_with_token/', {
            'email': "testemail@gmail.com",
            'new_password1': 'newpassword',
            'new_password2': 'newpassword'
        })
        self.assertEqual(response.status_code, 401)

    def test_change_password_with_token_invalid_email(self):
        response = self.client.post('/api/v1/password_change_with_token/', {
            'token': self.token.key,
            'email': 'wrongemail@example.com',
            'new_password1': 'newpassword',
            'new_password2': 'newpassword'
        })
        self.assertEqual(response.status_code, 400)

    def test_change_password_with_token_password_mismatch(self):
        response = self.client.post('/api/v1/password_change_with_token/', {
            'token': self.token.key,
            'email': self.user.email,
            'new_password1': 'newpassword',
            'new_password2': 'differentpassword'
        })
        self.assertEqual(response.status_code, 400)
