from django.test import SimpleTestCase
from django.urls import reverse,resolve
from app.views import  *
class TestUrls(SimpleTestCase):
    def tests_display_exercise_url_is_resolved(self):
        url = reverse('exercise-view')
        
        self.assertEquals(resolve(url).func,exerciseView)
    
    def tests_create_exercise_url_is_resolved(self):
        url = reverse('create_exercise')
        
        self.assertEquals(resolve(url).func,exerciseCreate)
    
    def tests_register_url_is_resolved(self):
        url = reverse('register')
        
        self.assertEquals(resolve(url).func,registration_view)
    
    def tests_create_personal_dimensions_url_is_resolved(self):
        url = reverse('create_personal_Dimensions')
        
        self.assertEquals(resolve(url).func,createpersonalDimensions)
    
    def tests_create_training_url_is_resolved(self):
        url = reverse('create_training')
        
        self.assertEquals(resolve(url).func,createTraining)
    
    def tests_display_training_url_is_resolved(self):
        url = reverse('display_training')
        
        self.assertEquals(resolve(url).func,displayTraining)
    def tests_display_exercise_url_is_resolved(self):
        url = reverse('create_own_exercise')
        
        self.assertEquals(resolve(url).func,createOwnExercise)
    def tests_create_own_exercise_url_is_resolved(self):
        url = reverse('display_own_exercise')
        
        self.assertEquals(resolve(url).func,displayOwnExercise)
    def tests_create_personal_goals_url_is_resolved(self):
        url = reverse('create_personal_goals')
        
        self.assertEquals(resolve(url).func,createPersonalGoals)
    def tests_display_personal_goals_url_is_resolved(self):
        url = reverse('display_personal_goals')
        self.assertEquals(resolve(url).func,displayPersonalGoals)
    def tests_display_single_series_url_is_resolved(self):
        url = reverse('display_single_series')
        
        self.assertEquals(resolve(url).func,displaySingleSeries)
    def tests_create_single_series_url_is_resolved(self):
        url = reverse('create_single_series')
        
        self.assertEquals(resolve(url).func,createSingleSeries)
    def tests_display_description_goals_url_is_resolved(self):
        url = reverse('display_description_goals')
        
        self.assertEquals(resolve(url).func,displayDescriptionGoals)
    def tests_create_description_goals_url_is_resolved(self):
        url = reverse('create_description_goals')
        self.assertEquals(resolve(url).func,createDescriptionGoals)
    def tests_update_training_url_is_resolved(self):
        url = reverse('update_training')
        
        self.assertEquals(resolve(url).func,updateTraining)
    def tests_delete_goals_url_is_resolved(self):
        url = reverse('delete_goals',args=["test"])
        
        self.assertEquals(resolve(url).func,deleteGoals)
    def tests_delete_measurement_url_is_resolved(self):
        url = reverse('delete_measurement',args=["test"])
        
        self.assertEquals(resolve(url).func,deleteMeasurement)

    def tests_delete_training_url_is_resolved(self):
        url = reverse('delete_training',args=["test"])
        self.assertEquals(resolve(url).func,deleteTraining)
    
    def tests_update_date_of_training_url_is_resolved(self):
        url = reverse('update_date_of_training',args=[1])
        
        self.assertEquals(resolve(url).func,updatedateofTraining)
    def tests_display_exercise_url_is_resolved(self):
        url = reverse('update_training_after_end',args=[1])
        
        self.assertEquals(resolve(url).func,updateTrainingafterEnd)