# from django.core.validators import validate_email
# from django.db.models import Q
#
# from .models import *
# from rest_framework import serializers
# from django.contrib.auth.models import User
#
# class RegistrationSerializer(serializers.ModelSerializer):
#     password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
#     class Meta:
#         model = CustomUser
#         fields = ('id', 'username', 'email', 'password', 'password2')
#         write_only_fields = ('password')
#         read_only_fields = ('id',)
#         extra_kwargs = {'email': {'required': True}}
#
#     @staticmethod
#     def validate_password(password):
#         if len(password) < 4:
#             raise serializers.ValidationError('Hasło za krótkie (minimum 4 litery)')
#
#         if len(password) > 50:
#             raise serializers.ValidationError('Hasło za długie (maksimum 50 liter)')
#         return password
#     @staticmethod
#     def validate_username(username):
#         if len(username) < 4:
#             raise serializers.ValidationError('Nazwa użytkowanika jest za krótka (minimum 4 litery)')
#
#         if len(username) > 30:
#             raise serializers.ValidationError('Nazwa użytkowanika jest za długa (maksimum 30 liter)')
#         return username
#
#     @staticmethod
#     def validate_email(email):
#         try:
#             validate_email(email)
#         except:
#             raise serializers.ValidationError({'email': 'Email jest nie poprawny'})
#         return email
#     def validate(self, data):
#         if data['password'] != data['password2']:
#             raise serializers.ValidationError({'password': 'Hasła się nie zgadzają'})
#         return data
#     def create(self, validated_data):
#         user = CustomUser.objects.create(
#             username=validated_data['username'],
#             email=validated_data['email'],
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user.return_dict_data_with_token
#
#
# class UserSerializer(serializers.ModelSerializer):
#     password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
#     class Meta:
#         model = User
#         fields = ('id', 'username','email', 'password','password2')
#         write_only_fields = ('password')
#         read_only_fields = ('id',)
#         extra_kwargs = {'email': {'required': True}}
#
#     def create(self, validated_data):
#         user = User.objects.create(
#             username=validated_data['username'],
#             email=validated_data['email'],
#         )
#         password = self.validated_data['password']
#         password2 = self.validated_data['password2']
#         if password != password2:
#             raise serializers.ValidationError({'password': 'Hasła się nie zgadzają'})
#         else:
#             user.set_password(validated_data['password'])
#             user.save()
#
#         return user
# class PersonalDimensionsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PersonalDimensions
#         fields = '__all__'
# class PersonalGoalsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PersonalGoals
#         fields = '__all__'
# class PersonalResultsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PersonalResults
#         fields = '__all__'
# class ExerciseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Exercise
#         fields = '__all__'
#
# class OwnExerciseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OwnExercise
#         fields = '__all__'
#
# class DescriptionGoalsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DescriptionGoals
#         fields = '__all__'
#
# class RepsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Reps
#         fields = '__all__'
# class AssumedRepsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AssumedReps
#         fields = '__all__'
#
# class ExercisesForTrainingSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(required=True)
#     class Meta:
#         model = Exercise
#         fields = ['id']
#
# class SingleSeriesForTrainingSerializer(serializers.ModelSerializer):
#     exercise = ExercisesForTrainingSerializer(required=False, allow_null=True)
#     class Meta:
#         model = SingleSeries
#         fields = '__all__'
#
# class SingleSeriesSerializer(serializers.ModelSerializer):
#     # reps = RepsSerializer(many=True)
#     exercise = ExerciseSerializer(required=False, allow_null=True)
#     ownexercise = OwnExerciseSerializer(required=False, allow_null=True)
#     class Meta:
#         model = SingleSeries
#         fields = '__all__'
#
#     def create(self, validated_data):
#         singleseries = SingleSeries.objects.create(**validated_data)
#         return singleseries
#
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
#
#     # def create(self,validated_data):
#     #     singleseries_data = validated_data.pop('training')
#     #     training = Training.objects.create(**validated_data)
#     #     for singleseries_dat in singleseries_data:
#     #         if 'exercise' in singleseries_dat:
#     #
#     #             exercise = Exercise.objects.get(name = singleseries_dat['exercise']['name'])
#     #             singleseries_dat['exercise'] = exercise
#     #         else:
#     #
#     #             ownexercise = OwnExercise.objects.get(name = singleseries_dat['ownexercise']['name'])
#     #             singleseries_dat['ownexercise'] = ownexercise
#     #         singleseries = SingleSeries.objects.create(**singleseries_dat)
#     #         training.training.add(singleseries)
#     #     return training
#
#
#
