import { useNavigate } from 'react-router-dom';

import useAuthContext from './useAuthContext';
import authActions from '../actions/authActions';

import useWorkoutsContext from './useWorkoutsContext';
import workoutActions from '../actions/workoutActions';

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useWorkoutsContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: authActions.LOGOUT });
    dispatchWorkouts({ type: workoutActions.SET_WORKOUTS, payload: null });
    localStorage.clear('user');
    navigate('/');
  };

  return handleLogout;
};

export default useLogout;
