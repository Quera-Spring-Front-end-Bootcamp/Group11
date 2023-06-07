import { Outlet } from 'react-router-dom';

import { CreateWorkSpaceModal, ShareProjectModal } from '../components/Modal';
import HeaderBoard from '../components/HeaderBoard';
import SideBar from '../components/SideBar/SideBar';
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
      <div className='h-screen flex'>
        <SideBar />
        <div className='w-[calc(100%-340px)] flex flex-col'>
          <div className='h-[170px] bg-[#fafbfc] pr-3 pl-6'>
            <HeaderBoard />
          </div>

          <div className='h-[calc(100%-170px)] p-5'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
