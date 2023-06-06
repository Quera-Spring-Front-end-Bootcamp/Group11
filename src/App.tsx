import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import axios from 'axios';

import Auth from './pages/Auth/Auth';
import Board from './pages/Board';

import {
  LogInCard,
  SignUpCard,
  ForgetPassword,
  ResetPassword,
} from './pages/Auth/AuthCards';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile/Profile';
import { BASE_URL } from './constants';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    //remove previous saved reset token if exists
    localStorage.removeItem('resetToken');

    //extract query params from url if exists (only for reset password)
    const queryParams = Object.fromEntries([...searchParams]);
    console.log(queryParams);

    if (queryParams.token) {
      //save token to local storage for accessibility
      localStorage.setItem('resetToken', queryParams.token);

      //navigate to reset password page
      navigate('/auth/resetPassword');
    } else {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        navigate('/auth');
      } else {
        navigate('/board/TaskList');
      }
    }
  }, []);

  return (
    <>
      <Toaster />
      <Routes
        location={location}
        key={location.pathname}>
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
