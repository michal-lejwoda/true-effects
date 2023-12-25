from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
        })


class Logout(APIView):
    def get(self, request):
        request.user.auth_token.delete()
        return Response(data="Zostałeś wylogowany", status=status.HTTP_200_OK)


class CreateUserView(CreateAPIView):
    model = get_user_model()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


@api_view(['POST'])
def registration_view(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "Poprawnie zarejestrowano użytkownika"
            data['email'] = user.email
            data['username'] = user.username
            token = Token.objects.get(user=user).key
            data['token'] = token
            return Response(data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def exercise_view(request):
    exercises = Exercise.objects.all()
    serializer = ExerciseSerializer(exercises, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def exercise_create(request):
    serializer = ExerciseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


# @permission_classes([IsAuthenticated,])
@api_view(['POST'])
def create_personal_dimensions(request):
    data = request.data
    data["user"] = request.user.id
    serializer = PersonalDimensionsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def display_personal_dimensions(request):
    user = request.user
    personalDimensions = PersonalDimensions.objects.filter(user=user).order_by('date')
    serializer = PersonalDimensionsSerializer(personalDimensions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def displayPersonalResults(request):
    user = request.user
    personal_results = PersonalResults.objects.filter(user=user)
    serializer = PersonalResultsSerializer(personal_results, many=True)
    return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated,])
def createPersonalResults(request):
    user = request.user
    serializer = PersonalResultsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def display_personal_goals(request):
    user = request.user
    personal_goals = PersonalGoals.objects.filter(user=user)
    serializer = PersonalGoalsSerializer(personal_goals, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def createPersonalGoals(request):
    user = request.user
    serializer = PersonalGoalsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def create_own_exercise(request):
    data = request.data
    user = request.user.id
    data['user'] = user
    serializer = OwnExerciseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def display_training(request):
    training = Training.objects.filter(user=request.user).order_by('date')
    serializer = TrainingSerializer(training, many=True)
    return Response(serializer.data)


# @api_view(['PUT'])
# def updateraining(request):
#     training = Training.objects.get(id=request.data['id'])
#     serializer = TrainingSerializer(instance=training, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#

@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def create_training(request):
    data = request.data
    data["user"] = request.user.id
    for element in data['training']:
        element["user"] = request.user.id
    serializer = TrainingSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated,])
def createTraining2(request):
    serializer = TrainingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def display_own_exercise(request):
    user = request.user
    exercises = OwnExercise.objects.filter(user=user)
    serializer = OwnExerciseSerializer(exercises, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def displaySingleSeries(request):
    user = request.user
    elements = SingleSeries.objects.all()
    serializer = SingleSeriesSerializer(elements, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_single_series(request):
    serializer = SingleSeriesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


@api_view(['GET'])
def display_description_goals(request):
    user = request.user
    description_data = DescriptionGoals.objects.filter(user=user)
    serializer = DescriptionGoalsSerializer(description_data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_description_goals(request):
    data = request.data
    data['user'] = request.user.id
    serializer = DescriptionGoalsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_training(request, pk):
    training = Training.objects.get(id=pk)
    training.delete()
    return Response("Trening został usunięty")


@api_view(['DELETE'])
def delete_measurement(request, pk):
    measurement = PersonalDimensions.objects.get(id=pk)
    measurement.delete()
    return Response("Pomiary zostały usunięty")


@api_view(['DELETE'])
def delete_goals(request, pk):
    goal = DescriptionGoals.objects.get(id=pk)
    goal.delete()
    return Response("Cel został usunięty")


@api_view(['POST'])
def update_date_of_training(request, pk):
    training = Training.objects.get(id=pk)
    training_data = training.training.all()
    training.id = None
    data = request.data
    training.date = data.get("date", training.date)
    training.save()
    for el in training_data:
        series = SingleSeries.objects.get(id=el.id)
        training.training.add(series)
    return Response("Data treningu została zaktualizowana")


@api_view(['POST'])
def update_training_after_end(request, pk):
    training = Training.objects.get(id=pk)
    training.time = request.data['time']
    for el in request.data['training']:
        singleseries = SingleSeries.objects.get(id=el['id'])
        singleseries.reps = el['reps']
        singleseries.save()
    training.save()
    return Response("Trening został'zaktualizowany")
