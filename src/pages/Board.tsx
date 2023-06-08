import { Outlet } from 'react-router-dom';

import { Container } from '../components';
import { CreateWorkSpaceModal, ShareProjectModal } from '../components/Modal';
import HeaderBoard from '../components/HeaderBoard';
import SideBar from '../components/SideBar/SideBar';

const Board = () => {
  return (
    <>
      <CreateWorkSpaceModal />
      <ShareProjectModal />
      <Container>
        <div className='h-screen flex'>
          <div>{<SideBar />}</div>
          <div className='w-[calc(100%-340px)] flex flex-col'>
            <div className='h-[170px] bg-[#fafbfc] pr-3 pl-6'>
              <HeaderBoard />
            </div>

            <div className='h-[calc(100%-170px)] p-5'>
              <Outlet />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Board;
