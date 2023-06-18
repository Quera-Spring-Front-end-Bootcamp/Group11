import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components';
import LogoType from '../LogoType/LogoType';

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth/login';

  return (
    <header className='container flex items-center justify-between gap-5 py-20 absolute right-1/2 translate-x-1/2'>
      <LogoType />

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
