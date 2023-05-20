import { Link, useLocation } from 'react-router-dom';
import { Anchor as MantineAnchor } from '@mantine/core';

type HeaderProps = {};
const Header = ({ }: HeaderProps) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth/login';

  return (
    <header className='container flex items-center justify-between gap-5 py-20 absolute right-1/2 translate-x-1/2'>
      <MantineAnchor
        href='/'
        title='کوئرا تسک منیجر'
        className='font-extrabold text-32 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500'>
        کوئرا تسک منیجر
      </MantineAnchor>

      {isLoginPage ? (
        <div className='flex items-center gap-5'>
          <span>ثبت نام نکرده ای؟</span>
          <Link
            to='/auth/signup'
            className='bg-primary p-a rounded-md text-white text-14'>
            ثبت نام
          </Link>
        </div>
      ) : (
        <div className='flex items-center gap-5'>
          <span>قبلا ثبت‌نام کرده‌ای؟</span>
          <Link
            to='/auth/login'
            className='bg-primary p-a rounded-md text-white text-14'>
            ورود
          </Link>
        </div>
      )}

    </header>
  );
};
export default Header;
