import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

// Contexts
import WorkoutsContextProvider from '../context/WorkoutsContext';

function Layout() {
  return (
    <>
      <Navbar />
      <WorkoutsContextProvider>
        <div className='pages'>
          <Outlet />
        </div>
      </WorkoutsContextProvider>
    </>
  );
}

export default Layout;
