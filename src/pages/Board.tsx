import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { CreateWorkSpaceModal, ShareProjectModal } from '../components/Modal';
import HeaderBoard from '../components/HeaderBoard';
import { BaseSideBar, BoardSideBar } from '../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BASE_URL } from '../constants';
import axios from 'axios';
import boardSlice from '../redux/slices/BoardSlices/BoardSlice';
import { toast } from 'react-hot-toast';

const Board = () => {
  const { search: queryParams } = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.board.loading);
  const state = useSelector((state: any) => state.board);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const {
          data: { data: projectData },
        } = await axios.get(
          `${BASE_URL}/board/${searchParams.get('projectId')}`,
          {
            headers: {
              'x-auth-token': localStorage.getItem('accessToken'),
            },
          }
        );
        const {
          data: {
            data: { name: projectName, _id: id },
          },
        } = await axios.get(
          `${BASE_URL}/projects/${searchParams.get('projectId')}`,
          {
            headers: {
              'x-auth-token': localStorage.getItem('accessToken'),
            },
          }
        );
        dispatch(
          boardSlice.actions.setSelectedProjectData({
            boardData: projectData,
            id,
            name: projectName,
          })
        );

        dispatch(boardSlice.actions.setLoading(false));
      } catch (error) {
        console.log(error);
        toast.error('خطا در دریافت اطلاعات');
      }
    };

    fetchProject();
  }, [queryParams]);

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
              {loading ? 'LOADING...' : <Outlet />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
