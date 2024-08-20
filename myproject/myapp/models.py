from django.db import models

class Exercise(models.Model):
    exercise_name = models.CharField(max_length=200)
    sets = models.IntegerField(default=0)
    reps = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)

    def __str__(self):
        return self.exercise_name

class Workout(models.Model):
    name = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    exercises = models.ManyToManyField(Exercise, related_name='workouts')
    cardio = models.TextField(blank=True)
    calories_burnt = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    notes = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
class Recommendations(models.Model):
    name = models.CharField(max_length=200)
    muscles_targeted = models.TextField()
    description = models.TextField()

    def __str__(self):
        return self.name
