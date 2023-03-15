import { useEffect } from 'react';

import useWorkoutsContext from '../hooks/useWorkoutsContext';
import workoutActions from '../actions/workoutActions';

import { fetchWorkouts } from '../utils';

import NewWorkoutForm from '../components/NewWorkoutForm';
import WorkoutItem from '../components/WorkoutItem';

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const abortController = new AbortController();

    fetchWorkouts(abortController)
      .then((workouts) => {
        dispatch({ type: workoutActions.SET_WORKOUTS, payload: workouts });
      })
      .catch((error) => {
        console.log(error.message);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && Array.isArray(workouts) && workouts.length > 0
          ? workouts.map((workout) => (
              <WorkoutItem workout={workout} key={workout._id} />
            ))
          : null}
      </div>
      <NewWorkoutForm />
    </div>
  );
}

export default Home;
