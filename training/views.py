from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.viewsets import GenericViewSet

from training.models import Exercise


class ExerciseViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


class PersonalDimensionsViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PersonalDimensionsSerializer

    def get_queryset(self):
        user = self.request.user
        return PersonalDimensions.objects.filter(user=user).order_by('date')

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)


# TODO Fix this
class PersonalGoalsViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PersonalGoalsSerializer

    def get_queryset(self):
        user = self.request.user
        return PersonalGoals.objects.filter(user=user)


class OwnExerciseViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = OwnExerciseSerializer

    def get_queryset(self):
        user = self.request.user
        return OwnExercise.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)


class TrainingViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TrainingSerializer

    def get_queryset(self):
        return Training.objects.filter(user=self.request.user).order_by('date')

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)


class SingleSeriesViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
