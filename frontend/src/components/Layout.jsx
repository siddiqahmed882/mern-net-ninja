import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <div className='pages'>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
