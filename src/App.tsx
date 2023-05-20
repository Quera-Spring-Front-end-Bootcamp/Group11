import { Routes, Route, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Auth from './pages/Auth';
import Main from './pages/Main';
import { LogInCard, SignUpCard, ForgetPassword } from './components/AuthCards';

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
    </Routes>
  );
}

export default App;
