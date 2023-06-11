import { Outlet, useLocation, useSearchParams } from 'react-router-dom';

import { CreateWorkSpaceModal, ShareProjectModal } from '../components/Modal';
import HeaderBoard from '../components/HeaderBoard';
import { BaseSideBar, BoardSideBar } from '../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import boardSlice from '../redux/slices/BoardSlices/BoardSlice';
import { toast } from 'react-hot-toast';
import { getAllProjectBoardsApi } from '../services/boardApi';
import { getProjectByIdApi } from '../services/projectApi';

const Board = () => {
  const { search: queryParams } = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.board.loading);

  const selectedProject = searchParams.get('projectId');

  useEffect(() => {
    const fetchProject = async () => {
      if (!selectedProject) return;
      dispatch(boardSlice.actions.setLoading(true));
      try {
        //get all boards of selected project
        const {
          data: { data: projectData },
        } = await getAllProjectBoardsApi(selectedProject);

        //get selected project data
        const {
          data: {
            data: { name: projectName, _id: id },
          },
        } = await getProjectByIdApi(selectedProject);

        //save data in redux
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
          <div className=''>
            <div className='h-[120px] bg-[#fafbfc] pr-3 pl-6'>
              <HeaderBoard />
            </div>

            <div className='h-[calc(100vh-120px)] mx-4 overflow-x-auto'>
              {!selectedProject ? (
                'WELCOME...'
              ) : loading ? (
                'LOADING...'
              ) : (
                <Outlet />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
