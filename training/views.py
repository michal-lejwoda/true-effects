from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from django.utils import timezone
from training.models import Exercise, UserDimension, UserGoal, Training
from training.serializers import ExerciseSerializer, UserDimensionSerializer, UserGoalSerializer, TrainingSerializer, \
    MultiSeriesSerializer


class ExerciseViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ExerciseSerializer

    def get_queryset(self):
        #TODO CACHE
        return Exercise.objects.filter(public=True)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['public'] = True
        serializer = ExerciseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['POST'], permission_classes=[IsAuthenticated])
    def post_user_exercise(self, request):
        data = request.data.copy()
        data['public'] = False
        data['user'] = request.user.id
        serializer = ExerciseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_user_exercises(self, request):
        user = request.user
        user_exercises =  Exercise.objects.filter(user=user).order_by('-popularity')
        serializer = ExerciseSerializer(user_exercises, many=True)
        return Response(serializer.data)

class UserDimensionViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDimensionSerializer

    def get_queryset(self):
        user = self.request.user
        return UserDimension.objects.filter(user=user).order_by('date')

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)


# TODO Fix this
class UserGoalViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserGoalSerializer

    def get_queryset(self):
        user = self.request.user
        return UserGoal.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id, created_date=timezone.now().date())

class TrainingViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TrainingSerializer

    def get_queryset(self):
        return Training.objects.filter(user=self.request.user).order_by('date')

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)

    @action(detail=False, methods=['POST'], permission_classes=[IsAuthenticated])
    def update_multi_series(self, request):
        data = request.data.copy()
        training_id = data.pop('id')
        training_obj = Training.objects.get(id=training_id)
        user = request.user
        #TODO For loop
        serializer = MultiSeriesSerializer(data=data)
        if serializer.is_valid():
            serializer = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # user_exercises = Exercise.objects.filter(user=user).order_by('-popularity')
        # serializer = ExerciseSerializer(user_exercises, many=True)
        # return Response(serializer.data)
