import { useState } from 'react';
import useWorkoutsContext from '../hooks/useWorkoutsContext';
import useAuthContext from '../hooks/useAuthContext';
import workoutActions from '../actions/workoutActions';

function NewWorkoutForm() {
  const [formData, setFormData] = useState({
    title: '',
    load: 0,
    reps: 0,
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  /**
   * @desc update the formData
   * @param {import('react').ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    const type = e.target.type,
      name = e.target.name,
      value = type === 'number' ? e.target.valueAsNumber : e.target.value;

    setEmptyFields((prev) => prev.filter((field) => field !== name));

    return setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * @desc submit the form
   * @param {import('react').FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:4000/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: workoutActions.ADD_WORKOUT, payload: data.workout });

      setFormData({
        title: '',
        load: 0,
        reps: 0,
      });

      setError(null);

      setEmptyFields([]);

      alert('Workout created');
      return;
    }

    const error = data.error || 'Failed to create a new workout';
    setError(error);
    setEmptyFields(data.emptyFields);
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <div className='form-group'>
        <label htmlFor='title'>Excercise Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={formData['title']}
          onChange={handleChange}
          className={emptyFields.includes('title') ? 'error' : ''}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='load'>Load (Kg)</label>
        <input
          type='number'
          name='load'
          id='load'
          value={formData['load']}
          onChange={handleChange}
          className={emptyFields.includes('load') ? 'error' : ''}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='reps'>Reps</label>
        <input
          type='number'
          name='reps'
          id='reps'
          value={formData['reps']}
          onChange={handleChange}
          className={emptyFields.includes('reps') ? 'error' : ''}
        />
      </div>
      <button type='submit'>Submit</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default NewWorkoutForm;
