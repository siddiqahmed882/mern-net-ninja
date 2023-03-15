export const fetchWorkouts = async (abortController) => {
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
