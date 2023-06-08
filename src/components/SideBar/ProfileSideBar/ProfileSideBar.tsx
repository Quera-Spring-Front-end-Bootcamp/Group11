import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { BsPersonExclamation, BsPersonCheck, BsGear } from 'react-icons/bs';
import { Button } from '../../../components';

interface ProfileSideBarProp {
  profileSection: string | undefined;
}
const ProfileSideBar = ({ profileSection }: ProfileSideBarProp) => {
  const listItem = [
    {
      id: 'personalInfo',
      title: 'اطلاعات فردی',

      icon: <BsPersonExclamation size={'2rem'} />,
    },
    {
      id: 'accountInfo',
      title: 'اطلاعات حساب',
      icon: <BsPersonCheck size={'2rem'} />,
    },
    {
      id: 'settings',
      title: 'تنظیمات',
      icon: <BsGear size={'2rem'} />,
    },
  ];
  return (
    <div className='flex flex-col  w-[100%] h-[100%] mt-[70px]'>
      <Link to={'/board'}>
        <Button
          w={'110px'}
          radius={'8px'}
          py={'4px'}
          fz={'20px'}
          fw={'500'}
          leftIcon={<HiArrowRight size={'1.2rem'} />}
          styles={() => ({
            root: {
              '&:hover': {
                backgroundColor: '#277576',
              },
            },
            leftIcon: {
              marginRight: '0px',
              marginLeft: '8px',
            },
          })}>
          بازگشت
        </Button>
      </Link>
      <ul className='flex flex-col gap-[36px] mt-[40px]'>
        {listItem.map((item) => {
          return (
            <li
              className='cursor-pointer'
              key={item.id}>
              <Link to={item.id}>
                <div
                  className={
                    'flex flex-row items-center gap-[11px] py-[4px] px-[8px] ' +
                    (profileSection === item.id && 'bg-[#C5FFFF]')
                  }>
                  {item.icon}
                  <span className='text-[20px] leading-[31px] font-[600]'>
                    {item.title}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ProfileSideBar;
