from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  WorkoutViewSet, ExerciseViewSet, RecommendationsViewSet

router = DefaultRouter()
router.register(r'workouts', WorkoutViewSet)
router.register(r'exercises', ExerciseViewSet)
router.register(r'recommendations', RecommendationsViewSet)

urlpatterns = [
    path('', include(router.urls))
]
