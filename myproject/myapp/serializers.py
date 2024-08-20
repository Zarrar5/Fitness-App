from rest_framework import serializers
from .models import Workout, Exercise, Recommendations

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'exercise_name', 'sets', 'reps', 'weight']  

class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)

    class Meta:
        model = Workout
        fields = ['id', 'name', 'date', 'exercises', 'cardio', 'calories_burnt', 'notes']

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises')
        workout = Workout.objects.create(**validated_data)
        for exercise_data in exercises_data:
            exercise = Exercise.objects.create(**exercise_data)
            workout.exercises.add(exercise)
        return workout
    
class RecommendationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendations
        fields = '__all__'