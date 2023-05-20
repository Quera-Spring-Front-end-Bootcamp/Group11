import { useParams, Outlet, useOutlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import { useEffect } from 'react';

import  Card  from '../components/Card'

export interface AuthPageProps {}

const Auth: React.FC<AuthPageProps> = ({}) => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  //if user enter /auth manually route automatically redirect to login page
  useEffect(() => {
    if (!outlet) navigate('login');
  });

  return (
    <>
      <Header />
      <div className='h-screen relative'>
        <div className='absolute bottom-0 right-0 left-0 bg-gradient-to-r from-blue-400 to-emerald-400 h-[50vh] bg-auth'></div>
        <div className='h-screen grid justify-center items-center '>
          <!-- remove conflicts -->
        </div>
      </div>
    </>
  );
};

export default Auth;
