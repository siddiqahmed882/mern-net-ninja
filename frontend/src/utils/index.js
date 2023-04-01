export const fetchWorkouts = async (abortController, token) => {
  const response = await fetch('http://localhost:4000/api/workouts', {
    signal: abortController.signal,

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.log({ response, data });
    const error = data.error || 'Failed to fetch';
    throw new Error(error, { cause: response.status === 403 ? 'Unauthorized' : 'FetchError' });
  }

  return data.workouts;
};
