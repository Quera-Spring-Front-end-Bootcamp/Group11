import { Accordion, LogOutButton, MiniProfile, Button } from '../';
import { WorkSpaceList } from '../WorkSpaceList';
import { SearchInput } from '../SearchInput';

import LogoType from '../LogoType/LogoType';
import { FiPlusSquare } from 'react-icons/fi';

const SideBar = () => {
  return (
    <div className='flex flex-col bg-[#FAFBFC] w-[340px] py-[40px] pr-[50px] pl-[16px] h-[100%] '>
      <div className='mb-[31px] '>
        <LogoType />
      </div>

      <div>
        <Accordion
          
          inputArray={[
            {
              id: 1,
              AccTitle: 'ورک اسپیس‌ها',
              AccDetail: (
                <div>
                  <div className='mb-[13px]'>
                    <SearchInput />
                  </div>
                  <div className='mb-[16px]'>
                    <Button
                      bg={'#D3D3D3'}
                      c={'#1E1E1E'}
                      w={'100%'}
                      leftIcon={<FiPlusSquare size='1.5rem' />}
                      styles={() => ({
                        root: {
                          width: '100%',
                          border: '0',
                        },
                        leftIcon: {
                          marginLeft: '4px',
                          marginRight: '0',
                          padding: '4px',
                        },
                      })}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'gray',
                          color: '#fff',
                        },
                      }}>
                      ساختن اسپیس جدید
                    </Button>
                  </div>
                  <div className='max-h-[310px] overflow-auto'>
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                    <WorkSpaceList />
                  </div>
                </div>
              ),
            },
          ]}
          labelFW={'600'}
          labelFS={'16px'}
          labelLH={'25px'}
          detailPadd={'0px'}
          detailMarg={'13px 0 0 0'}
        />
      </div>

      <div className='absolute bottom-[30px] mt-[20px]'>
        <div className='mb-[20px]'>
          <MiniProfile />
        </div>
        <div>
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
