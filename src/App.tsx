import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useSearchParams,
} from 'react-router-dom';

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
import userUpdate from './util/userinfoUpdate';
import { ProjectListView } from './components';
import {
  AccountInfo,
  PersonalInfo,
  Settings,
} from './pages/Profile/ProfileSection';
import { DragAndDrop } from './components/DragAndDrop';
import { Calendar } from './components/Calendar';
import { MultipleContainers } from './components/ColumnProjectView/ColumnProjectView';

function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams]);

    //navigate to reset password page and push token to url as query param
    if (queryParams.token) {
      navigate({
        pathname: '/auth/resetPassword',
        search: `?token=${queryParams.token}`,
      });
      return;
    }

    ///access token check
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/auth');
    } else {
      userUpdate(accessToken);
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
            element={<ProjectListView />}
          />
          <Route
            path='TaskColumn'
            element={
              <div>
                <MultipleContainers />
              </div>
            }
          />
          <Route
            path='TaskCalendar'
            element={
              <div>
                <Calendar />
              </div>
            }
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
          element={<Profile />}>
          <Route
            path='personalInfo'
            element={<PersonalInfo />}
          />
          <Route
            path='accountInfo'
            element={<AccountInfo />}
          />
          <Route
            path='settings'
            element={<Settings />}
          />
          <Route
            path='*'
            element={<Navigate to='personalInfo' />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
