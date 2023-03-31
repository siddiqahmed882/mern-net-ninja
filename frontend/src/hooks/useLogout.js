import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import authActions from '../actions/authActions';

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: authActions.LOGOUT });
    localStorage.clear('user');
    navigate('/');
  };

  return handleLogout;
};

export default useLogout;
