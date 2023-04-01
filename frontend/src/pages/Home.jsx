import { useEffect } from 'react';

import useWorkoutsContext from '../hooks/useWorkoutsContext';
import useAuthContext from '../hooks/useAuthContext';
import workoutActions from '../actions/workoutActions';
import authActions from '../actions/authActions';

import { fetchWorkouts } from '../utils';

import NewWorkoutForm from '../components/NewWorkoutForm';
import WorkoutItem from '../components/WorkoutItem';

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user, dispatch: userDispatch } = useAuthContext();

  useEffect(() => {
    const abortController = new AbortController();

    fetchWorkouts(abortController, user.token)
      .then((workouts) => {
        dispatch({ type: workoutActions.SET_WORKOUTS, payload: workouts });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.log(error);
        if (error.cause === 'Unauthorized') {
          alert('You are not authorized to view this page. Please log in.');
          userDispatch({ type: authActions.LOGOUT });
        }
      });

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && Array.isArray(workouts) && workouts.length > 0
          ? workouts.map((workout) => <WorkoutItem workout={workout} key={workout._id} />)
          : null}
      </div>
      <NewWorkoutForm />
    </div>
  );
}

export default Home;
