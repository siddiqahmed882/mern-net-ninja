import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

// Contexts
import AuthContextProvider from '../context/AuthContext';
import WorkoutsContextProvider from '../context/WorkoutsContext';

function Layout() {
  return (
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <Navbar />
        <div className='pages'>
          <Outlet />
        </div>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  );
}

export default Layout;
