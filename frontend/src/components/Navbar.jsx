import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

function Navbar() {
  const handleLogout = useLogout();
  const { user } = useAuthContext();
  return (
    <header>
      <div className='container'>
        <h1 className='logo'>
          <Link to='/'>Workout Buddy</Link>
        </h1>
        <nav>
          <div>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
