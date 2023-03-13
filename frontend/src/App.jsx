import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/layout';

// Pages
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
