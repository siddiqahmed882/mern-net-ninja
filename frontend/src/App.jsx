import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
