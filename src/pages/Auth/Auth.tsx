import { useOutlet, useNavigate, Outlet } from 'react-router-dom';
import { Header } from '../../components';
import { useEffect } from 'react';

export interface AuthPageProps {}

const Auth: React.FC<AuthPageProps> = ({}) => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  //if user enter /auth manually automatically redirect to login page
  useEffect(() => {
    if (!outlet) navigate('login');
  });

  return (
    <>
      <Header />
      <div className='bg-gray-100 h-screen w-full flex flex-col items-center justify-center'>
        <div className='absolute bottom-0 right-0 left-0 bg-gradient-to-r from-blue-400 to-emerald-400 h-[50vh] bg-auth'></div>
        <Outlet />
      </div>
    </>
  );
};

export default Auth;
