from django.db.models import Q
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, \
    DestroyModelMixin
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from training.models import Exercise, UserDimension, UserGoal, Training, UserDimensionConfiguration, SingleSeries
from training.serializers import ExerciseSerializer, UserDimensionSerializer, UserGoalSerializer, TrainingSerializer, \
    SingleSeriesSerializer, UserDimensionConfigurationSerializer, \
    UserDimensionSerializerForCreate, UserDimensionSerializerConfigurationForCompare, SimpleTrainingSerializer


class ExerciseViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ExerciseSerializer

    def get_queryset(self):
        param = self.request.GET.get('name', None)
        query = Q(public=True) | Q(user=self.request.user)
        return Exercise.objects.filter(query, name__istartswith=param)

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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_user_exercises(self, request):
        user = request.user
        user_exercises = Exercise.objects.filter(user=user).order_by('-popularity')
        serializer = ExerciseSerializer(user_exercises, many=True)
        return Response(serializer.data)


class UserDimensionViewSet(CreateModelMixin, UpdateModelMixin,  ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDimensionSerializer

    def get_queryset(self):
        user = self.request.user
        return UserDimension.objects.filter(user=user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_user_dimensions_for_create(self, request):
        user = request.user
        try:
            user_dimension = UserDimension.objects.filter(user=user).latest("date")
            serializer = UserDimensionSerializerForCreate(instance=user_dimension, context={'request': request})
            return Response(serializer.data)
        except UserDimension.DoesNotExist:
            data = {"weight": None, "growth": None, "left_biceps": None, "right_biceps": None, "left_forearm": None,
                    "right_forearm": None, "left_leg": None, "right_leg": None, "bodyfat": None}
            serializer = UserDimensionSerializerForCreate(data=data, context={'request': request})
            if serializer.is_valid():
                return Response(serializer.data)
            else:
                return Response(serializer.errors)


# TODO Fix this
class UserGoalViewSet(CreateModelMixin, DestroyModelMixin, UpdateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserGoalSerializer

    def get_queryset(self):
        user = self.request.user
        return UserGoal.objects.filter(user=user).order_by('finish_date')

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def not_completed(self, request):
        user = request.user
        queryset = UserGoal.objects.filter(user=user, completed=False).order_by('-finish_date')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def completed(self, request):
        user = request.user
        queryset = UserGoal.objects.filter(user=user, completed=True).order_by('-finish_date')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SingleTrainingViewSet(ListModelMixin, CreateModelMixin, DestroyModelMixin, UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TrainingSerializer

    def get_queryset(self):
        return Training.objects.filter(user=self.request.user).order_by('date')

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)

    @action(detail=True, methods=['PUT'], permission_classes=[IsAuthenticated])
    def update_training(self, request, pk):
        data = request.data
        instance = self.get_object()
        for multi_series in data.pop('multi_series'):
            # multi_series_object = MultiSeries.objects.get(id=i['id'])
            # multi_series_serializer = MultiSeriesSerializer(instance=multi_series_object, data=i)
            # if multi_series_serializer.is_valid():
            #     multi_series_serializer.save()
            for single_series in multi_series.pop('single_series'):
                single_series_object = SingleSeries.objects.get(id=single_series['id'])
                single_series_serializer = SingleSeriesSerializer(instance=single_series_object, data=single_series)
                if single_series_serializer.is_valid():
                    single_series_serializer.save()
        training_serializer = TrainingSerializer(instance=instance, data=data)
        if training_serializer.is_valid():
            training_serializer.save()
            return Response(training_serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'], permission_classes=[IsAuthenticated])
    def move_training(self, request, pk):
        pass

        # print("data")
        # print(data)
        # instance = self.get_object()
        # for multiseries_index, i in enumerate(instance.multi_series.all()):
        #     print(i.exercise.name)
        #     print("multiseries_index")
        #     print(multiseries_index)
        #     for single_series_index, j in enumerate(i.single_series.all()):
        #         single_series_object = SingleSeries.objects.get(id=j.id)
        #         print("single_series_index")
        #         print(single_series_index)
        #         # single_series_serializer = SingleSeriesSerializer()
        #         # if single_series_serializer.is_valid():
        #         #     single_series_serializer.save()

        return Response("Working", status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_training_by_id(self, request, pk=None):
        try:
            training = Training.objects.get(id=pk, user=self.request.user)
            sorted_multi_series = training.multi_series.all().order_by('id')
            for multi_series in sorted_multi_series:
                multi_series.single_series.all().order_by('id')
        except Training.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(instance=training)
        return Response(serializer.data)

    # @action(detail=False, methods=['POST'], permission_classes=[IsAuthenticated])
    # def update_multi_series(self, request):
    #     data = request.data.copy()
    #     training_id = data.pop('id')
    #     training_obj = Training.objects.get(id=training_id)
    #     multi_series_elements = data.pop('multi_series')
    #     user = request.user
    #     #TODO For loop
    #     for multi_series_element in multi_series_elements:
    #         print("test")
    #         mss = MultiSeriesSerializer(data = multi_series_element)
    #         if mss.is_valid():
    #             multi_series_obj = mss.save()
    #         else:
    #             print(mss.errors)
    #         for single_series_element in multi_series_element['single_series']:
    #             print("test")
    #             print(single_series_element)
    #             single_series_serializer = SingleSeriesSerializer(data=single_series_element)
    #             if single_series_serializer.is_valid():
    #                 single_series_obj = single_series_serializer.save()
    #
    #         # serializer = MultiSeriesSerializer(data=multi_series_element)
    #         # if serializer.is_valid():
    #         #     saved_object = serializer.save()
    #         #     training_obj.multi_series.set(saved_object)
    #     return Response(training_obj)


class TrainingViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SimpleTrainingSerializer

    def get_queryset(self):
        return Training.objects.filter(user=self.request.user).order_by('date')

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_last_completed_trainings(self, request):
        current_timezone = timezone.now().date()
        last_three_records = Training.objects.filter(user=self.request.user, date__lt=current_timezone).order_by(
            'date')[:3]
        serializer = self.get_serializer(last_three_records, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_upcoming_trainings(self, request):
        current_timezone = timezone.now().date()
        last_three_records = Training.objects.filter(user=self.request.user, date__gte=current_timezone).order_by(
            'date')[:3]
        serializer = self.get_serializer(last_three_records, many=True)
        return Response(serializer.data)


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
    def get_user_dimensions_configuration_for_compare(self, request):
        user = request.user
        try:
            user_dimension_config = UserDimensionConfiguration.objects.get(user=user)
            serializer = UserDimensionSerializerConfigurationForCompare(instance=user_dimension_config,
                                                                        context={'request': request})
            return Response(serializer.data)
        except UserDimension.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)

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


class SingleSeriesViewSet(UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SingleSeriesSerializer
    queryset = SingleSeries.objects.all()
