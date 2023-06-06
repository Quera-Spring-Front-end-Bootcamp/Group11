import { SetStateAction, useState } from 'react';
import { BaseSideBar } from '../../components/SideBar';
import { AccountInfo, PersonalInfo, Settings } from './ProfileSection';

import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { BsPersonExclamation, BsPersonCheck, BsGear } from 'react-icons/bs';
import { Button } from '../../components';

const mainSection = (data: string) => {
  if (data === '1') {
    return <PersonalInfo />;
  }
  if (data === '2') {
    return <AccountInfo />;
  }
  if (data === '3') {
    return <Settings />;
  }
};

const Profile = () => {
  const [selectedItem, setSelectedItem] = useState('1');

  const handleOnClick = (data: SetStateAction<string>) => {
    setSelectedItem(data);
  };

  const listItem = [
    {
      id: '1',
      title: 'اطلاعات فردی',
      icon: <BsPersonExclamation size={'2rem'} />,
    },
    {
      id: '2',
      title: 'اطلاعات حساب',
      icon: <BsPersonCheck size={'2rem'} />,
    },
    {
      id: '3',
      title: 'تنظیمات',
      icon: <BsGear size={'2rem'} />,
    },
  ];

  return (
    <div className='flex flex-row h-screen w-screen'>
      <div className='bg-[#FAFBFC] h-[100%] w-[23%] order-1'>
        <BaseSideBar>
          <div className='flex flex-col  w-[100%] h-[100%] mt-[70px]'>
            <Link to={'/'}>
              <Button
                w={'110px'}
                radius={'8px'}
                py={'4px'}
                fz={'20px'}
                fw={'500'}
                leftIcon={<HiArrowRight size={'1.2rem'} />}
                styles={() => ({
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
                    key={item.id}
                    onClick={()=> handleOnClick(item.id)}>
                    <div
                      className={
                        'flex flex-row items-center gap-[11px] py-[4px] px-[8px] ' +
                        (selectedItem === item.id ? 'bg-[#C5FFFF]' : '')
                      }>
                      {item.icon}
                      <span className='text-[20px] leading-[31px] font-[600]'>
                        {item.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </BaseSideBar>
      </div>
      <div className='bg-[#FAFBFC] h-[100%] w-[77%] order-2'>
        <div className='pt-[15vh] pr-[58px]'>{mainSection(selectedItem)}</div>
      </div>
    </div>
  );
};

export default Profile;
