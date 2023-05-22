import { Link, useLocation } from 'react-router-dom';
import { Anchor as MantineAnchor } from '@mantine/core';
import { Button } from '../../components';

type HeaderProps = {};
const Header = ({}: HeaderProps) => {
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
          <span>ثبت‌نام نکرده‌ای؟</span>
          <Link to='/auth/signup'>
            <Button w={95}>ثبت‌نام</Button>
          </Link>
        </div>
      ) : (
        <div className='flex items-center gap-5'>
          <span>قبلا ثبت‌نام کرده‌ای؟</span>
          <Link to='/auth/login'>
            <Button w={95}>ورود</Button>
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
