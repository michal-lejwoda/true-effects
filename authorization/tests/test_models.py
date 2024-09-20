from django.db.utils import IntegrityError
from django.test import TestCase

from achievements.models import Achievement, TypeAchievement, UserAchievement, UserModifyTraining, SumLoggedInTime
from authorization.models import CustomUser


class SimpleTest(TestCase):
    def test_correct_comparision(self):
        self.assertEqual(1, 1)

    def test_incorrect_comparision(self):
        self.assertNotEqual(2, 1)


class AchievementTest(TestCase):
    def setUp(self):
        self.type_achievement = TypeAchievement.objects.create(name="Milestone")

    def test_create_correct_achievement(self):
        achievement = Achievement.objects.create(
            name="First Run",
            description="Run for 30 minutes",
            type_achievement=self.type_achievement,
            minutes=30,
            message="Great job!"
        )
        self.assertIsNotNone(achievement)
        self.assertEqual(achievement.name, "First Run")
        self.assertEqual(achievement.minutes, 30)

    def test_create_incorrect_achievement(self):
        with self.assertRaises(ValueError):
            Achievement.objects.create(
                name="",
                description="",
            )


class UserAchievementTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username="testuser", password="password")
        self.type_achievement = TypeAchievement.objects.create(name="Milestone")
        self.achievement = Achievement.objects.create(
            name="First Run",
            description="Run for 30 minutes",
            type_achievement=self.type_achievement,
            minutes=30,
            message="Great job!"
        )

    def test_create_correct_user_achievement(self):
        user_achievement = UserAchievement.objects.create(
            achievement=self.achievement,
            user=self.user,
            is_earned=True
        )
        self.assertIsNotNone(user_achievement)
        self.assertEqual(user_achievement.achievement.name, "First Run")
        self.assertTrue(user_achievement.is_earned)

    def test_create_incorrect_user_achievement(self):
        with self.assertRaises(IntegrityError):
            UserAchievement.objects.create(
                achievement=None,
                user=self.user,
                is_earned=True
            )

    def test_create_two_same_achievements_to_one_user(self):
        UserAchievement.objects.create(
            achievement=self.achievement,
            user=self.user,
            is_earned=True
        )
        with self.assertRaises(IntegrityError):
            UserAchievement.objects.create(
                achievement=self.achievement,
                user=self.user,
                is_earned=True
            )

    def test_create_two_different_achievements_to_one_user(self):
        achievement2 = Achievement.objects.create(
            name="Second Run",
            description="Run for 60 minutes",
            type_achievement=self.type_achievement,
            minutes=60,
            message="Even better!"
        )
        UserAchievement.objects.create(
            achievement=self.achievement,
            user=self.user,
            is_earned=True
        )
        user_achievement2 = UserAchievement.objects.create(
            achievement=achievement2,
            user=self.user,
            is_earned=True
        )
        self.assertIsNotNone(user_achievement2)


class UserModifyTrainingTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username="testuser", password="password")

    def test_create_user_modify_training(self):
        training = UserModifyTraining.objects.create(
            user=self.user,
            time=45
        )
        self.assertIsNotNone(training)
        self.assertEqual(training.time, 45)

    def test_return_error_if_user_does_not_exist(self):
        with self.assertRaises(IntegrityError):
            UserModifyTraining.objects.create(
                user=None,
                time=45
            )


class SumLoggedInTimeTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username="testuser", password="password")

    def test_sum_logged_in_time(self):
        logged_time = SumLoggedInTime.objects.create(
            user=self.user,
            time=120
        )
        self.assertIsNotNone(logged_time)
        self.assertEqual(logged_time.time, 120)
