import { Routes, Route, useLocation } from 'react-router-dom';

import Auth from './pages/Auth';
import Main from './pages/Main';

function App() {
  const location = useLocation();
  return (
    <Routes
      location={location}
      key={location.pathname}>
      <Route
        path='/'
        element={<Main />}
      />
      <Route
        path='/auth'
        element={<Auth />}
      />
    </Routes>
  );
}

export default App;
