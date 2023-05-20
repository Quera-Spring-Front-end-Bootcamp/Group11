import React from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import Auth from './Auth/Auth';

export interface AuthPageProps {}

const Main: React.FC<AuthPageProps> = ({}) => {
  const navigate = useNavigate();

  const routes = [
    { path: '/auth/login', element: <Auth /> },
    { path: '/', element: <RootRedirect /> },
  ];

  return useRoutes(routes);
};

const RootRedirect = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/auth/login');
  }, []);

  return null;
};

export default Main;
