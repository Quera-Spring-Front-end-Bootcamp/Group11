import { Routes, Route, useNavigate } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import Board from './pages/Board';

import {
  LogInCard,
  SignUpCard,
  ForgetPassword,
  ResetPassword,
} from './pages/Auth/AuthCards';

import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile/Profile';
import IndexPage from './pages/Index';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/auth');
    }
  }, []);

  return (
    <>
      <Toaster />
      <Routes
      // location={location}
      // key={location.pathname}
      >
        {['/', '/:queryParams'].map((path) => (
          <Route
            key={path}
            path={path}
            element={<IndexPage />}
          />
        ))}
        <Route
          path='/board'
          element={<Board />}>
          <Route
            path='TaskList'
            element={<div>TaskList</div>}
          />
          <Route
            path='TaskColumn'
            element={<div>TaskColumn</div>}
          />
          <Route
            path='TaskCalendar'
            element={<div>TaskCalendar</div>}
          />
        </Route>
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
          <Route
            path='resetPassword'
            element={<ResetPassword />}
          />
        </Route>
        <Route
          path='/profile'
          element={<Profile />}
        />
      </Routes>
    </>
  );
}

export default App;
