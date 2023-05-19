import { Link } from 'react-router-dom';
import { Anchor as MantineAnchor } from '@mantine/core';

const Header = () => {
  return (
    <header className='container flex items-center justify-between gap-5 py-3'>
      <MantineAnchor
        href='/'
        title='کوئرا تسک منیجر'
        className='font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500'>
        کوئرا تسک منیجر
      </MantineAnchor>

      <div className='flex items-center gap-5'>
        <span>ثبت نام نکرده ای؟</span>
        <Link
          to='/'
          className='bg-primary px-5 py-1 rounded-md  text-white'>
          ثبت نام
        </Link>
      </div>
    </header>
  );
};
export default Header;
