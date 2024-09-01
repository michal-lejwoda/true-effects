from django.db import transaction
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, \
    DestroyModelMixin
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ViewSet

from backend.tasks import send_reset_password_to_mail
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
        queryset = Exercise.objects.filter(query)
        if param:
            queryset = queryset.filter(name__istartswith=param)
        return queryset


    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['public'] = True
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['POST'], permission_classes=[IsAuthenticated])
    def post_user_exercise(self, request):
        data = request.data.copy()
        data['public'] = False
        data['user'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_user_exercises(self, request):
        user = request.user
        user_exercises = Exercise.objects.filter(user=user).order_by('-popularity')
        page = self.paginate_queryset(user_exercises)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(user_exercises, many=True)
        return Response(serializer.data)


class UserDimensionViewSet(CreateModelMixin, UpdateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDimensionSerializer

    # Default data for new user dimension instances if none exist
    DEFAULT_USER_DIMENSION_DATA = {
        "weight": None,
        "growth": None,
        "left_biceps": None,
        "right_biceps": None,
        "left_forearm": None,
        "right_forearm": None,
        "left_leg": None,
        "right_leg": None,
        "bodyfat": None,
    }

    def get_queryset(self):
        return UserDimension.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_user_dimensions_for_create(self, request):
        user_dimension = UserDimension.objects.filter(user=request.user).order_by('-date').first()
        if user_dimension:
            serializer = UserDimensionSerializerForCreate(instance=user_dimension, context={'request': request})
        else:
            serializer = UserDimensionSerializerForCreate(data=self.DEFAULT_USER_DIMENSION_DATA,
                                                          context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserGoalViewSet(CreateModelMixin, DestroyModelMixin, UpdateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserGoalSerializer

    def get_queryset(self):
        return UserGoal.objects.filter(user=self.request.user).order_by('finish_date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def not_completed(self, request):
        queryset = self.get_queryset().filter(completed=False).order_by('-finish_date')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def completed(self, request):
        queryset = self.get_queryset().filter(completed=True).order_by('-finish_date')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def filter_by_completion(self, request):
        completed_param = request.query_params.get('completed', None)
        if completed_param is not None:
            completed = completed_param.lower() == 'true'
            queryset = self.get_queryset().filter(completed=completed).order_by('-finish_date')
        else:
            queryset = self.get_queryset().order_by('-finish_date')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SingleTrainingViewSet(ListModelMixin, CreateModelMixin, DestroyModelMixin, UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TrainingSerializer

    def get_queryset(self):
        return Training.objects.filter(user=self.request.user).order_by('date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['PUT'], permission_classes=[IsAuthenticated])
    def update_training(self, request, pk=None):
        instance = self.get_object()
        data = request.data

        with transaction.atomic():
            try:
                multi_series_data = data.pop('multi_series', [])
                for multi_series in multi_series_data:
                    for single_series in multi_series.get('single_series', []):
                        single_series_object = get_object_or_404(SingleSeries, id=single_series['id'])
                        single_series_serializer = SingleSeriesSerializer(instance=single_series_object,
                                                                          data=single_series)
                        single_series_serializer.is_valid(raise_exception=True)
                        single_series_serializer.save()
                training_serializer = TrainingSerializer(instance=instance, data=data)
                training_serializer.is_valid(raise_exception=True)
                training_serializer.save()

                return Response(training_serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_training_by_id(self, request, pk=None):
        training = get_object_or_404(Training, id=pk, user=self.request.user)
        training.multi_series.all().prefetch_related('single_series').order_by('id')
        serializer = self.get_serializer(instance=training)
        return Response(serializer.data)

class TrainingViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SimpleTrainingSerializer

    def get_queryset(self):
        return Training.objects.filter(user=self.request.user).order_by('date')

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_last_completed_trainings(self, request):
        return self._get_trainings(date_filter__lt=timezone.now().date(), limit=3, order_by='-date')

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_upcoming_trainings(self, request):
        return self._get_trainings(date_filter__gte=timezone.now().date(), limit=3, order_by='date')

    def _get_trainings(self, date_filter, limit, order_by):
        queryset = Training.objects.filter(user=self.request.user, date=date_filter).order_by(order_by)[:limit]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class UserDimensionConfigurationViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDimensionConfigurationSerializer
    queryset = UserDimensionConfiguration.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()
        data['user'] = self.request.user.id
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_user_dimensions_configuration_for_compare(self, request):
        user = request.user
        user_dimension_config = get_object_or_404(UserDimensionConfiguration, user=user)
        serializer = UserDimensionSerializerConfigurationForCompare(instance=user_dimension_config,
                                                                    context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_user_dimension_config(self, request):
        user = request.user
        user_config = get_object_or_404(UserDimensionConfiguration, user=user)
        serializer = UserDimensionConfigurationSerializer(instance=user_config)
        return Response(serializer.data)


class SingleSeriesViewSet(UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SingleSeriesSerializer
    queryset = SingleSeries.objects.all()


class SendMail(ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['POST'])
    def reset_password(self, request):
        send_reset_password_to_mail(request.data['email'])
        return Response(status=status.HTTP_200_OK)
