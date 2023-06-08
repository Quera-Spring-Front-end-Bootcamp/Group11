import { Outlet } from 'react-router-dom';

import { CreateWorkSpaceModal, ShareProjectModal } from '../components/Modal';
import HeaderBoard from '../components/HeaderBoard';
import SideBar from '../components/SideBar/SideBar';
import { BaseSideBar } from '../components/SideBar';

const Board = () => {
  return (
    <>
      <CreateWorkSpaceModal />
      <ShareProjectModal />
      <div className='flex flex-row h-screen w-screen'>
        <div className='bg-[#FAFBFC] h-[100%] w-[23%] order-1'>
          <BaseSideBar>
            <SideBar />
          </BaseSideBar>
        </div>
        <div className='bg-[#FAFBFC] h-[100%] w-[77%] order-2'>
          <div className='pt-[4vh] pr-[16px]'>
            <div className='h-[170px] bg-[#fafbfc] pr-3 pl-6'>
              <HeaderBoard />
            </div>

            <div className='h-[calc(100%-170px)] p-5'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
