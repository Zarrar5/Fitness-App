import React, { useEffect, useState } from 'react';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [toggle, setToggle] = useState(true);

    const handleToggle = (id) =>{
        setToggle(toggle === id ? null : id);
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts =() =>{
        fetch('http://localhost:8000/myapp/workouts/', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
            },
        })
            .then(response =>{
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setWorkouts(data))
            .catch(error => console.error('Error fetching workouts:', error));
    };
    const deleteWorkout = (id) =>{
        fetch(`http://localhost:8000/myapp/workouts/${id}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok){
                    throw new Error('Failed to delete workout');
                }
                fetchWorkouts();
            })
            .catch(error => console.error('Error deleting workout:', error));
    };

    return (
        <div>
        <ul>
            {workouts.map(workout => (
                <li key={workout.id}>
                    <h3>{workout.name}</h3>
                    <p>Date: {workout.date}</p>

                    <button onClick={() => handleToggle(workout.id)}>
                    {toggle === workout.id ? 'Hide Details' : 'Show Details'} 
                    </button>

                    <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
                    {toggle === workout.id && (
                        <>
                    <p>Cardio: {workout.cardio}</p>
                    <p>Calories Burnt: {workout.calories_burnt}</p>
                    <p>Notes: {workout.notes}</p>
                    <h4>Exercises:</h4>
                    <ul>
                        {workout.exercises.map(exercise => (
                            <li key={exercise.id}>
                                <strong>{exercise.exercise_name}</strong> - Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight} 
                            </li>
                        ))}
                    </ul> 
                    </>
                    )}
                </li>
            ))}
        </ul>
        </div>
    );
};

export default WorkoutList;
