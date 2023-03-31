import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useWorkoutsContext must be used within a WorkoutsProvider');
  }

  return context;
};

export default useAuthContext;
