import { Outlet } from 'react-router-dom';

import { CreateWorkSpaceModal, ShareProjectModal } from '../components/Modal';
import HeaderBoard from '../components/HeaderBoard';
import { BaseSideBar, BoardSideBar } from '../components/SideBar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../constants';
import axios from 'axios';

const Board = () => {
  const username = useSelector((state: any) => state.user.username);

  useEffect(() => {
    if (!username) return;

    //fetch user info
    const fetchUserInfo = async (identifier: string) => {
      const {
        data: { data: fetchData },
      } = await axios.get(`${BASE_URL}/users/${identifier}`);

      return fetchData;
    };
    fetchUserInfo(username);

    
  }, [username]);

  return (
    <>
      <CreateWorkSpaceModal />
      <ShareProjectModal />
      <div className='flex flex-row h-screen w-screen'>
        <div className='bg-[#FAFBFC] h-[100%] w-[23%] order-1'>
          <BaseSideBar>
            <BoardSideBar />
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
