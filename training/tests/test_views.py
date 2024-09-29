from django.test import RequestFactory
from django.utils import timezone
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

from authorization.models import CustomUser
from training.models import Exercise, UserDimension, UserGoal, Training
from rest_framework.authtoken.models import Token

from training.serializers import TrainingSerializer


class ExerciseViewSetTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser2', password='password')
        self.user.refresh_from_db()
        self.token, created = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)



        self.exercise_data = {
            'name': 'Push Up',
            'public': True,
            'popularity': 1
        }
        self.exercise = Exercise.objects.create(user=self.user, **self.exercise_data)

    def test_create_exercise(self):
        url = reverse('exercise-list')
        response = self.client.post(url, self.exercise_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_user_exercises(self):
        url = reverse('exercise-get-user-exercises')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Push Up')


class UserDimensionViewSetTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='password')
        self.token, created = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.dimension_data = {
            'weight': 80,
            'growth': 180,
            'left_biceps': 40,
        }
        self.user_dimension = UserDimension.objects.create(user=self.user, **self.dimension_data)

    def test_create_user_dimension(self):
        url = reverse('userdimension-list')
        response = self.client.post(url, self.dimension_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_user_dimensions(self):
        url = reverse('userdimension-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['weight'], 80)



class UserGoalViewSetTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='password')
        self.token, created = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.goal_data = {
            'goal': 'Lose Weight',
            'completed': False,
            'finish_date': timezone.now().date()
        }
        self.user_goal = UserGoal.objects.create(user=self.user, **self.goal_data)

    def test_create_user_goal(self):
        url = reverse('usergoal-list')
        response = self.client.post(url, self.goal_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_not_completed_goals(self):
        url = reverse('usergoal-not-completed')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['goal'], 'Lose Weight')

    def test_get_completed_goals(self):
        self.user_goal.completed = True
        self.user_goal.save()

        url = reverse('usergoal-completed')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['goal'], 'Lose Weight')


class SingleTrainingViewSetTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='password')
        self.token, created = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)


        self.exercise_data = {
            'name': 'Push Up',
            'public': True,
            'popularity': 1
        }
        self.factory = RequestFactory()
        self.exercise = Exercise.objects.create(user=self.user, **self.exercise_data)
        self.training_data = {
            'name': 'Training 1',
            'date': '2024-09-25',
            'multi_series': [{
                'exercise': self.exercise.id,
                'single_series': [{
                    'extra_weight': 10,
                    'rest': 60,
                    'concentric_phase': 2,
                    'eccentric_phase': 3,
                    'pause_after_concentric_phase': 1,
                    'pause_after_eccentric_phase': 1,
                    'reps': 10,
                    'series_num': 1,
                    'exercise': self.exercise.id,
                }],
                'series_num': 1
            }]
        }

    def test_create_training(self):
        url = reverse('single_training-list')
        response = self.client.post(url, self.training_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], self.training_data['name'])

    def test_get_training_by_id(self):
        request = self.factory.post('/fake-url/', self.training_data, format='json')
        request.user = self.user
        serializer = TrainingSerializer(data=self.training_data, context={'request': request})
        if serializer.is_valid():
            training = serializer.save(user=self.user)

            url = reverse('single_training-get-training-by-id', args=[training.id])
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['name'], self.training_data['name'])