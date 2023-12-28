from .models import *
from rest_framework import serializers

class UserDimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDimension
        fields = '__all__'


class UserGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGoal
        fields = '__all__'

class ExerciseSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(required=True)
    class Meta:
        model = Exercise
        fields = ['id', 'user', 'name', 'public']
        extra_kwargs = {
            'public': {"write_only": True},
            'user': {'write_only': True}
        }


class ExercisesForTrainingSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    class Meta:
        model = Exercise
        fields = ['id']

# class SingleSeriesForTrainingSerializer(serializers.ModelSerializer):
#     exercise = ExercisesForTrainingSerializer(required=False, allow_null=True)
#     class Meta:
#         model = SingleSeries
#         fields = '__all__'

class SingleSeriesSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer(required=False, allow_null=True)
    class Meta:
        model = SingleSeries
        fields = '__all__'

class MultiSeriesSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer(required=False, allow_null=True)
    single_series = SingleSeriesSerializer(required=False, allow_null=True, many=True)
    class Meta:
        model = MultiSeries
        fields = '__all__'

class TrainingSerializer(serializers.ModelSerializer):
    multi_series = MultiSeriesSerializer(many=True, required=False, allow_null=True)
    class Meta:
        model = Training
        fields = '__all__'

    def create(self, validated_data):
        singleseries_list = validated_data.pop('multi_series')
        training = Training.objects.create(**validated_data)

        for singleseries_data in singleseries_list:
            if 'exercise' in singleseries_data:
                exercise = Exercise.objects.get(id=singleseries_data['exercise']['id'])
                singleseries_data['exercise'] = exercise
            singleseries = SingleSeries.objects.create(**singleseries_data)
            training.training.add(singleseries)
        return training


    # def create(self, validated_data):
    #     singleseries = SingleSeries.objects.create(**validated_data)
    #     return singleseries

# class TrainingSerializer(serializers.ModelSerializer):
#     training = SingleSeriesForTrainingSerializer(many=True)
#     class Meta:
#         model = Training
#         fields = '__all__'
#     def update(self, instance, validated_data):
#         training = validated_data.pop('training')
#         for training_element in range(len(instance.training.all())):
#             singleseries = SingleSeries.objects.get(id = instance.training.all()[training_element].id)
#             singleseries.reps = training[training_element]['reps']
#             singleseries.save(update_fields=['reps'])
#         return instance
#
#
#     def create(self, validated_data):
#         singleseries_list = validated_data.pop('training')
#         training = Training.objects.create(**validated_data)
#
#         for singleseries_data in singleseries_list:
#             if 'exercise' in singleseries_data:
#                 exercise = Exercise.objects.get(id=singleseries_data['exercise']['id'])
#                 singleseries_data['exercise'] = exercise
#             singleseries = SingleSeries.objects.create(**singleseries_data)
#             training.training.add(singleseries)
#         return training

    # def create(self,validated_data):
    #     singleseries_data = validated_data.pop('training')
    #     training = Training.objects.create(**validated_data)
    #     for singleseries_dat in singleseries_data:
    #         if 'exercise' in singleseries_dat:
    #
    #             exercise = Exercise.objects.get(name = singleseries_dat['exercise']['name'])
    #             singleseries_dat['exercise'] = exercise
    #         else:
    #
    #             ownexercise = OwnExercise.objects.get(name = singleseries_dat['ownexercise']['name'])
    #             singleseries_dat['ownexercise'] = ownexercise
    #         singleseries = SingleSeries.objects.create(**singleseries_dat)
    #         training.training.add(singleseries)
    #     return training



