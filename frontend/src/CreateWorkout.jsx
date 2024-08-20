import React from 'react';
import {useForm, useFieldArray} from 'react-hook-form';

const CreateWorkout = () => {
  const {register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues:{
      name: '',
      date: '',
      cardio: '',
      calories_burnt: 0,
      notes: '',
      exercises: [{ exercise_name: '', sets: 0, reps: 0, weight: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises'
  });

  const onSubmit = async (data) =>{
    try{
      const response = await fetch('http://localhost:8000/myapp/workouts/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if(!response.ok){
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('Workout saved!');
      console.log(result);
    }catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Workout Name:</label>
          <input id="name" {...register('name', { required: 'Workout name is required' })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input id="date" type="date" {...register('date', { required: 'Date is required' })} />
          {errors.date && <p>{errors.date.message}</p>}
        </div>

        <div>
          <label htmlFor="cardio">Cardio:</label>
          <textarea id="cardio" {...register('cardio')} />
        </div>

        <div>
          <label htmlFor="calories_burnt">Calories Burnt:</label>
          <input id="calories_burnt" type="number" step="1" {...register('calories_burnt')} />
        </div>

        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea id="notes" {...register('notes')} />
        </div>

        <div>
          <h3>Exercises:</h3>

          {fields.map((field, index) => (
            <div key={field.id}>
              <div>
                <label htmlFor={`exercises[${index}].exercise_name`}>Exercise Name:</label>
                <input
                  id={`exercises[${index}].exercise_name`}
                  {...register(`exercises[${index}].exercise_name`, { required: 'Exercise name is required' })}
                  defaultValue={field.exercise_name}
                />
                {errors.exercises?.[index]?.exercise_name && <p>{errors.exercises[index].exercise_name.message}</p>}
              </div>

              <div>
                <label htmlFor={`exercises[${index}].sets`}>Sets:</label>
                <input
                  id={`exercises[${index}].sets`}
                  type="number"
                  {...register(`exercises[${index}].sets`, { required: 'Sets are required' })}
                  defaultValue={field.sets}
                />
                {errors.exercises?.[index]?.sets && <p>{errors.exercises[index].sets.message}</p>}
              </div>

              <div>
                <label htmlFor={`exercises[${index}].reps`}>Reps:</label>
                <input
                  id={`exercises[${index}].reps`}
                  type="number"
                  {...register(`exercises[${index}].reps`, { required: 'Reps are required' })}
                  defaultValue={field.reps}
                />
                {errors.exercises?.[index]?.reps && <p>{errors.exercises[index].reps.message}</p>}
              </div>

              <div>
                <label htmlFor={`exercises[${index}].weight`}>Weight:</label>
                <input
                  id={`exercises[${index}].weight`}
                  type="number"
                  {...register(`exercises[${index}].weight`, { required: 'Weight is required' })}
                  defaultValue={field.weight}
                />
                {errors.exercises?.[index]?.weight && <p>{errors.exercises[index].weight.message}</p>}
              </div>

              <button type="button" onClick={() => remove(index)}>Remove Exercise</button>
            </div>
          ))}
          <button type="button" onClick={() => append({ exercise_name: '', sets: 0, reps: 0, weight: 0 })}>Add Exercise</button>
        </div>

        <button type="submit">Save Workout</button>
      </form>
    </div>
  );
};

export default CreateWorkout;
