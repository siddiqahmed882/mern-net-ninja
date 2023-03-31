import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace={true} />;
};

export default ProtectedRoute;
