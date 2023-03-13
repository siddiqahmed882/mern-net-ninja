import { useState, useEffect } from 'react';
import NewWorkoutForm from '../components/NewWorkoutForm';

import WorkoutItem from '../components/WorkoutItem';

const fetchWorkouts = async (abortController) => {
  const response = await fetch('http://localhost:4000/api/workouts', {
    signal: abortController.signal,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = data.error || 'Failed to fetch';
    throw Error(error);
  }

  return data.workouts;
};

function Home() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();

    fetchWorkouts(abortController)
      .then((workouts) => {
        setWorkouts(workouts);
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
