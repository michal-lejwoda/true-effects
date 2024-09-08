from rest_framework.test import APITestCase, APIRequestFactory
from training.serializers import UserDimensionSerializer, UserDimensionSerializerForCreate, SingleSeriesSerializer, MultiSeriesSerializer, TrainingSerializer
from training.models import UserDimension, Exercise, SingleSeries, MultiSeries, UserDimensionConfiguration
from authorization.models import CustomUser

class UserDimensionSerializerTest(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass')
        self.user_dimension = UserDimension.objects.create(
            user=self.user,
            date='2023-01-01',
            weight=75.5,
            growth=180,
            left_biceps=35.0,
            right_biceps=36.0,
            bodyfat=15.0
        )

    def test_user_dimension_serializer(self):
        serializer = UserDimensionSerializer(self.user_dimension)
        data = serializer.data

        self.assertEqual(data['user'], self.user.id)
        self.assertEqual(data['weight'], 75.5)
        self.assertEqual(data['growth'], 180)
        self.assertEqual(data['left_biceps'], 35.0)
        self.assertEqual(data['right_biceps'], 36.0)
        self.assertEqual(data['bodyfat'], 15.0)


class UserDimensionSerializerForCreateTest(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass')
        self.user_dimension_data = {"weight":75,"left_biceps":12,"right_biceps":123,"left_forearm":213,
                                    "right_forearm":123,"left_leg":12,"right_leg":123,"date":"2024-09-08"}

    def test_user_dimension_serializer_for_create(self):
        factory = APIRequestFactory()
        request = factory.post('/some-url/', self.user_dimension_data, format='json')
        request.user = self.user
        serializer = UserDimensionSerializerForCreate(data=self.user_dimension_data, context={'request': request})

        self.assertTrue(serializer.is_valid())
        dimension = serializer.save()
        self.assertEqual(dimension.weight, 75)


class SingleSeriesSerializerTest(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass')
        self.exercise = Exercise.objects.create(user=self.user, name="Squat")
        self.single_series_data = {
            'user': self.user.id,
            'exercise': self.exercise.id,
            'extra_weight': 10.0,
            'rest': 60,
            'reps': 12,
            'series_num': 1
        }

    def test_single_series_serializer(self):
        serializer = SingleSeriesSerializer(data=self.single_series_data)

        self.assertTrue(serializer.is_valid(), f"Errors: {serializer.errors}")
        single_series = serializer.save()
        self.assertEqual(single_series.reps, 12)
        self.assertEqual(single_series.exercise, self.exercise)


class MultiSeriesSerializerTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass')
        self.exercise = Exercise.objects.create(user=self.user, name="Bench Press")
        self.single_series = SingleSeries.objects.create(user=self.user, exercise=self.exercise, reps=10, series_num=1)
        self.multi_series_data = {
            'user': self.user.id,
            'exercise': self.exercise.id,
            'single_series': [{'exercise': self.exercise.id, 'reps': self.single_series.reps, 'series_num': self.single_series.series_num}],
            'series_num': 1
        }

    def test_multi_series_serializer(self):
        serializer = MultiSeriesSerializer(data=self.multi_series_data)
        self.assertTrue(serializer.is_valid(), f"Errors: {serializer.errors}")
        multi_series = serializer.save()
        self.assertEqual(multi_series.exercise, self.exercise)
        self.assertEqual(multi_series.single_series.count(), 1)



class TrainingSerializerTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass')
        self.exercise = Exercise.objects.create(user=self.user, name="Deadlift")
        self.single_series = SingleSeries.objects.create(user=self.user, exercise=self.exercise, reps=8, series_num=1)
        self.multi_series = MultiSeries.objects.create(user=self.user, exercise=self.exercise)
        self.multi_series.single_series.add(self.single_series)
        self.training_data = {
            'user': self.user.id,
            'name': 'Leg Day',
            'date': '2023-09-07',
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
                    'series_num': 1
                }],
                'series_num': 1
            }]
        }

    def test_training_serializer(self):
        factory = APIRequestFactory()
        request = factory.post('/some-url/')
        request.user = self.user

        serializer = TrainingSerializer(data=self.training_data, context={'request': request})
        self.assertTrue(serializer.is_valid(), f"Errors: {serializer.errors}")
        training = serializer.save()
        self.assertEqual(training.user, self.user)
