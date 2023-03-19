import useWorkoutsContext from '../hooks/useWorkoutsContext';
import workoutActions from '../actions/workoutActions';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function WorkoutItem({ workout }) {
  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      dispatch({ type: workoutActions.DELETE_WORKOUT, payload: workout._id });
      return;
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button onClick={handleDelete} className='workout-delete'>
        <span className='material-symbols-outlined'>delete</span>
      </button>
    </div>
  );
}

export default WorkoutItem;
