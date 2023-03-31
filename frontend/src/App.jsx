import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/'>
            <Route path='/' element={<ProtectedRoute />}>
              <Route index element={<Home />} />
            </Route>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
