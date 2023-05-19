import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';

import  Card  from '../components/Card'

export interface AuthPageProps {}

const Auth: React.FC<AuthPageProps> = ({}) => {
  return (
    <>
      <Header />
      <div className='h-screen relative'>
        <div className='absolute bottom-0 right-0 left-0 bg-gradient-to-r from-blue-400 to-emerald-400 h-[50vh] bg-auth'></div>

        <div className='h-screen grid justify-center items-center '>
          <Card shadow='xl' radius='md' className='flex flex-col w-[500px] gap-5 justify-center'>
            <p className='text-center font-bold'>
              LOGIN FORM
            </p>
            <Link
              to='/'
              className='flex gap-2 justify-center items-center py-2 bg-neutral-400 hover:bg-slate-500/70 text-neutral-800 rounded-xl transition'>
              Back to Main Page
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
