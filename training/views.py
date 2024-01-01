from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from django.utils import timezone
from training.models import Exercise, UserDimension, UserGoal, Training, UserDimensionConfiguration
from training.serializers import ExerciseSerializer, UserDimensionSerializer, UserGoalSerializer, TrainingSerializer, \
    MultiSeriesSerializer, SingleSeriesSerializer, UserDimensionConfigurationSerializer


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
        return UserGoal.objects.filter(user=user, completed=False).order_by('finish_date')

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id, created_date=timezone.now().date())

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def completed(self, request):
        user = request.user
        queryset = UserGoal.objects.filter(user=user, completed=True).order_by('-finish_date')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

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
        multi_series_elements = data.pop('multi_series')
        user = request.user
        #TODO For loop
        for multi_series_element in multi_series_elements:
            print("test")
            mss = MultiSeriesSerializer(data = multi_series_element)
            if mss.is_valid():
                multi_series_obj = mss.save()
            else:
                print(mss.errors)
            for single_series_element in multi_series_element['single_series']:
                print("test")
                print(single_series_element)
                single_series_serializer = SingleSeriesSerializer(data=single_series_element)
                if single_series_serializer.is_valid():
                    single_series_obj = single_series_serializer.save()

            # serializer = MultiSeriesSerializer(data=multi_series_element)
            # if serializer.is_valid():
            #     saved_object = serializer.save()
            #     training_obj.multi_series.set(saved_object)
        return Response(training_obj)


class UserDimensionConfigurationViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDimensionConfigurationSerializer
    queryset = UserDimensionConfiguration.objects.all()
    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        data['user'] = self.request.user.id
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_user_dimension_config(self, request):
        data = request.data.copy()
        user = self.request.user
        data['user'] = user.id
        user_config = UserDimensionConfiguration.objects.get(user=user)
        serializer = UserDimensionConfigurationSerializer(instance=user_config, data=data)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)