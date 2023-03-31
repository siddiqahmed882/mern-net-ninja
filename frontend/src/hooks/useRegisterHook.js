import { useState } from 'react';
import useAuthContext from './useAuthContext';
import authActions from '../actions/authActions';

const useRegisterHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState('');
  const { dispatch } = useAuthContext();

  const register = async (userData) => {
    setIsLoading(true);
    serError('');
    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      dispatch({ type: authActions.LOGIN, payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      serError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, register };
};

export default useRegisterHook;
