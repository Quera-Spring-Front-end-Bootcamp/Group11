import { Routes, Route, useLocation } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import Board from './pages/Board';
import { LogInCard, SignUpCard, ForgetPassword } from './pages/Auth/AuthCards';
import Profile from './pages/Profile/Profile';

function App() {
  const location = useLocation();

  return (
    <Routes
      location={location}
      key={location.pathname}>
      <Route
        path='/'
        element={<Board />}
      />
      <Route
        path='/auth'
        element={<Auth />}>
        <Route
          path='signUp'
          element={<SignUpCard />}
        />
        <Route
          path='logIn'
          element={<LogInCard />}
        />
        <Route
          path='forgetPassword'
          element={<ForgetPassword />}
        />
      </Route>
      <Route
        path='/profile'
        element={<Profile />}
      />
    </Routes>
  );
}

export default App;
