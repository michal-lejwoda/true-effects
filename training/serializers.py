from rest_framework import serializers
from rest_framework.fields import empty
from django.utils.translation import ugettext_lazy as _
from rest_framework.relations import PrimaryKeyRelatedField

from .models import UserDimension, UserDimensionConfiguration, UserGoal, Exercise, SingleSeries, MultiSeries, Training


class UserDimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDimension
        fields = '__all__'


class UserDimensionSerializerForCreate(serializers.ModelSerializer):
    def __init__(self, instance=None, data=empty, **kwargs):
        super().__init__(instance, data, **kwargs)
        user = self.context['request'].user
        user_dimension_config = UserDimensionConfiguration.objects.get(user=user)
        user_dimension_config_attrs = vars(user_dimension_config)
        keys_to_remove = [key for key in self.fields.keys() if
                          key not in user_dimension_config_attrs or not user_dimension_config_attrs[key]]
        for key in keys_to_remove:
            if key is "date":
                continue
            self.fields.pop(key)
        self.fields.pop('user', None)
        self.fields.pop('id', None)
        if data is not empty:
            self.initial_data = data
        self.partial = kwargs.pop('partial', False)
        self._context = kwargs.pop('context', {})

    class Meta:
        model = UserDimension
        fields = '__all__'


class UserDimensionSerializerConfigurationForCompare(serializers.ModelSerializer):
    weight = serializers.SerializerMethodField()
    growth = serializers.SerializerMethodField()
    left_biceps = serializers.SerializerMethodField()
    right_biceps = serializers.SerializerMethodField()
    left_forearm = serializers.SerializerMethodField()
    right_forearm = serializers.SerializerMethodField()
    left_leg = serializers.SerializerMethodField()
    right_leg = serializers.SerializerMethodField()
    bodyfat = serializers.SerializerMethodField()

    def get_weight(self, obj):
        return _("Weight(kg)")

    def get_growth(self, obj):
        return _("Growth(cm)")

    def get_left_biceps(self, obj):
        return _("Left Biceps(cm)")

    def get_right_biceps(self, obj):
        return _("Right Biceps(cm)")

    def get_left_forearm(self, obj):
        return _("Left Arm(cm)")

    def get_right_forearm(self, obj):
        return _("Right Arm(cm)")

    def get_left_leg(self, obj):
        return _("Left Leg(cm)")

    def get_right_leg(self, obj):
        return _("Right Leg(cm)")

    def get_bodyfat(self, obj):
        return _("Bodyfat(%)")

    def __init__(self, instance=None, data=empty, **kwargs):
        super().__init__(data, **kwargs)
        if instance:
            instance_values = vars(instance)
            for key in list(self.fields.keys()):
                if not instance_values.get(key, True):
                    self.fields.pop(key)
        self.fields.pop('user', None)
        self.fields.pop('id', None)
        self.fields.pop('date', None)
        self.instance = instance
        if data is not empty:
            self.initial_data = data
        self.partial = kwargs.pop('partial', False)
        self._context = kwargs.pop('context', {})

    class Meta:
        model = UserDimension
        fields = '__all__'


class UserGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGoal
        fields = '__all__'


class UserDimensionConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDimensionConfiguration
        fields = '__all__'


class ExerciseSerializer(serializers.ModelSerializer):
    label = serializers.ReadOnlyField(source='name')
    value = serializers.ReadOnlyField(source='name')

    class Meta:
        model = Exercise
        fields = ['id', 'user', 'name', 'public', 'label', 'value']
        extra_kwargs = {
            'public': {"write_only": True},
            'user': {'write_only': True}
        }


class TrainingExerciseSerializer(serializers.ModelSerializer):
    label = serializers.ReadOnlyField(source='name')
    value = serializers.ReadOnlyField(source='name')

    class Meta:
        model = Exercise
        fields = ['id', 'user', 'name', 'public', 'label', 'value']
        extra_kwargs = {
            'public': {"write_only": True},
            'user': {'write_only': True}
        }

class SingleSeriesSerializerv2(serializers.ModelSerializer):
    exercise = PrimaryKeyRelatedField(queryset=Exercise.objects.all())

    def create(self, validated_data):
        user_id = validated_data.pop('user')
        validated_data['user'] = user_id
        single_series_obj = SingleSeries.objects.create(**validated_data)
        return single_series_obj

    def update(self, instance, validated_data):
        instance.extra_weight = validated_data.pop('extra_weight')
        instance.rest = validated_data.pop('rest')
        instance.concentric_phase = validated_data.pop('concentric_phase')
        instance.eccentric_phase = validated_data.pop('eccentric_phase')
        instance.pause_after_concentric_phase = validated_data.pop('pause_after_concentric_phase')
        instance.pause_after_eccentric_phase = validated_data.pop('pause_after_eccentric_phase')
        instance.reps = validated_data.pop('reps')
        instance.series_num = validated_data.pop('series_num')
        instance.save()
        return instance
    class Meta:
        model = SingleSeries
        fields = '__all__'


class SingleSeriesSerializer(serializers.ModelSerializer):
    exercise = TrainingExerciseSerializer(required=False, allow_null=True)

    def create(self, validated_data):
        user_id = validated_data.pop('user')
        exercise = Exercise.objects.get(id=validated_data['exercise']['id'])
        validated_data['exercise'] = exercise
        validated_data['user'] = user_id
        single_series_obj = SingleSeries.objects.create(**validated_data)
        return single_series_obj

    def update(self, instance, validated_data):
        instance.extra_weight = validated_data.pop('extra_weight')
        instance.rest = validated_data.pop('rest')
        instance.concentric_phase = validated_data.pop('concentric_phase')
        instance.eccentric_phase = validated_data.pop('eccentric_phase')
        instance.pause_after_concentric_phase = validated_data.pop('pause_after_concentric_phase')
        instance.pause_after_eccentric_phase = validated_data.pop('pause_after_eccentric_phase')
        instance.reps = validated_data.pop('reps')
        instance.series_num = validated_data.pop('series_num')
        instance.save()
        return instance
    class Meta:
        model = SingleSeries
        fields = '__all__'

class MultiSeriesSerializerv2(serializers.ModelSerializer):
    exercise = PrimaryKeyRelatedField(queryset=Exercise.objects.all())
    single_series = SingleSeriesSerializerv2(required=False, allow_null=True, many=True)

    class Meta:
        model = MultiSeries
        fields = '__all__'

    def create(self, validated_data):
        single_series_data = validated_data.pop('single_series', [])
        multi_series_obj = MultiSeries.objects.create(**validated_data)
        single_series_list = []
        for single_series_element in single_series_data:
            single_series_element['user'] = validated_data['user'].id
            single_series_element['exercise'] = single_series_element['exercise'].id
            single_series_serializer = SingleSeriesSerializerv2(data=single_series_element)
            if single_series_serializer.is_valid():
                single_series_obj = single_series_serializer.save()
                single_series_list.append(single_series_obj)
        multi_series_obj.single_series.set(single_series_list)
        return multi_series_obj



class MultiSeriesSerializer(serializers.ModelSerializer):
    exercise = TrainingExerciseSerializer(required=False, allow_null=True)
    single_series = SingleSeriesSerializer(required=False, allow_null=True, many=True)

    class Meta:
        model = MultiSeries
        fields = '__all__'

    def create(self, validated_data):
        user_id = validated_data.pop('user')
        exercise = Exercise.objects.get(id=validated_data['exercise']['id'])
        validated_data['exercise'] = exercise
        validated_data['user'] = user_id
        multi_series_obj = MultiSeries.objects.create(**validated_data)
        return multi_series_obj


class SimpleTrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = ['id', 'date', 'name']


class TrainingSerializer(serializers.ModelSerializer):
    multi_series = MultiSeriesSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Training
        fields = '__all__'

    def create(self, validated_data):
        multiseries_elements = validated_data.pop('multi_series')
        training = Training.objects.create(**validated_data)
        user = self.context['request'].user.id
        multi_series_list = []
        for multiseries_element in multiseries_elements:
            single_series_data = multiseries_element.pop('single_series')
            multiseries_element['user'] = user
            multi_series_serializer = MultiSeriesSerializer(data=multiseries_element)
            if multi_series_serializer.is_valid():
                multi_series_obj = multi_series_serializer.save()
                multi_series_list.append(multi_series_obj)
            single_series_list = []
            for single_series_element in single_series_data:
                single_series_element['user'] = user
                single_series_serializer = SingleSeriesSerializer(data=single_series_element)
                if single_series_serializer.is_valid():
                    single_series_obj = single_series_serializer.save()
                    single_series_list.append(single_series_obj)
                multi_series_obj.single_series.set(single_series_list)
            training.multi_series.set(multi_series_list)
        return training
