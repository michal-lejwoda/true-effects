from django.test import TestCase

class SimpleTest(TestCase):
    def test_correct_comparision(self):
        self.assertEqual(1, 1)

    def test_incorrect_comparision(self):
        self.assertEqual(2, 1)
