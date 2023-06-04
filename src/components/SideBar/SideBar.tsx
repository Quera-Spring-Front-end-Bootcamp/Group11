import { FiPlusSquare } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import { Accordion, LogOutButton, MiniProfile, Button } from '../';
import { WorkSpaceList } from '../WorkSpaceList';
import { SearchInput } from '../SearchInput';
import LogoType from '../LogoType/LogoType';
import CreateWorkSpaceModalSlice, {
  onOpen,
} from '../../redux/slices/ModalSlices/CreateWorkSpaceModalSlice';

const SideBar = () => {
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col justify-between bg-[#FAFBFC] w-[340px] py-[40px] pr-[50px] pl-[16px] h-[100%] '>
      <div>
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
                        fullWidth={true}
                        leftIcon={<FiPlusSquare size='1.5rem' />}
                        styles={() => ({
                          root: {
                            border: '0',
                            backgroundColor: 'yellow',
                          },
                          leftIcon: {
                            marginLeft: '4px',
                            marginRight: '0',
                            padding: '4px',
                          },
                        })}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#D3D3D3aa',
                          },
                        }}
                        onClick={() => {
                          dispatch(CreateWorkSpaceModalSlice.actions.onOpen());
                        }}>
                        ساختن اسپیس جدید
                      </Button>
                    </div>
                    <div
                      dir='ltr'
                      className='h-[300px] overflow-auto pr-[10px] scrollbar scrollbar-w-[5px] scrollbar-track-zinc-300 scrollbar-thumb-zinc-400 scrollbar-track-rounded-3xl scrollbar-thumb-rounded-3xl'>
                      <div dir='rtl'>
                        <WorkSpaceList />
                      </div>
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
      </div>

      <div className='mt-[20px]'>
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
