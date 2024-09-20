from django.test import TestCase
from django.utils import timezone

from authorization.models import CustomUser
from training.models import Exercise, SingleSeries, MultiSeries, Training, UserGoal, UserDimension, \
    UserDimensionConfiguration


class ExerciseModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
        self.exercise = Exercise.objects.create(user=self.user, name="Push-up", public=True, popularity=10)

    def test_exercise_creation(self):
        self.assertEqual(self.exercise.name, "Push-up")
        self.assertTrue(self.exercise.public)
        self.assertEqual(self.exercise.popularity, 10)

    def test_exercise_str_representation(self):
        self.assertEqual(str(self.exercise), "Push-up")


class SingleSeriesModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
        self.exercise = Exercise.objects.create(user=self.user, name="Push-up")
        self.single_series = SingleSeries.objects.create(
            user=self.user,
            exercise=self.exercise,
            extra_weight=5,
            reps=10,
            series_num=1
        )

    def test_single_series_creation(self):
        self.assertEqual(self.single_series.reps, 10)
        self.assertEqual(self.single_series.series_num, 1)
        self.assertEqual(self.single_series.extra_weight, 5)

    def test_single_series_str_representation(self):
        self.assertEqual(str(self.single_series), f"testuser Push-up 1")


class MultiSeriesModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
        self.exercise = Exercise.objects.create(user=self.user, name="Push-up")
        self.single_series = SingleSeries.objects.create(user=self.user, exercise=self.exercise, reps=10)
        self.multi_series = MultiSeries.objects.create(user=self.user, exercise=self.exercise, series_num=1)
        self.multi_series.single_series.add(self.single_series)

    def test_multi_series_creation(self):
        self.assertEqual(self.multi_series.series_num, 1)
        self.assertIn(self.single_series, self.multi_series.single_series.all())

    def test_multi_series_str_representation(self):
        self.assertEqual(str(self.multi_series), f"testuser Push-up 1")


class TrainingModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
        self.training = Training.objects.create(
            user=self.user,
            name="Morning Workout",
            date=timezone.now().date(),
            description="Leg day training"
        )

    def test_training_creation(self):
        self.assertEqual(self.training.name, "Morning Workout")
        self.assertEqual(self.training.description, "Leg day training")

    def test_training_str_representation(self):
        self.assertEqual(str(self.training), f"testuser Morning Workout {self.training.date}")


class UserGoalModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
        self.user_goal = UserGoal.objects.create(
            user=self.user,
            goal="Lose Weight",
            description="Lose 5kg in 2 months",
            finish_date=timezone.now().date()
        )

    def test_user_goal_creation(self):
        self.assertEqual(self.user_goal.goal, "Lose Weight")
        self.assertFalse(self.user_goal.completed)

    def test_user_goal_str_representation(self):
        self.assertEqual(str(self.user_goal), "testuser Lose Weight")


class UserDimensionModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
        self.user_dimension = UserDimension.objects.create(
            user=self.user,
            date=timezone.now().date(),
            weight=75,
            left_biceps=30
        )

    def test_user_dimension_creation(self):
        self.assertEqual(self.user_dimension.weight, 75)
        self.assertEqual(self.user_dimension.left_biceps, 30)


class UserDimensionConfigurationModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username="testuser", password="testpassword")

    def test_user_dimension_configuration_creation(self):
        user_dimension_config = UserDimensionConfiguration.objects.get(user=self.user)
        self.assertTrue(user_dimension_config.weight)
        self.assertFalse(user_dimension_config.growth)
        self.assertTrue(user_dimension_config.left_biceps)
        self.assertFalse(user_dimension_config.bodyfat)
