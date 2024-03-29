import {
  Outlet,
  useLocation,
  useOutlet,
  useSearchParams,
} from 'react-router-dom';

import {
  CreateProjectModal,
  CreateWorkSpaceModal,
  ShareProjectModal,
  ShareWorkspaceModal,
} from '../components/Modal';
import HeaderBoard from '../components/HeaderBoard';
import { BaseSideBar, BoardSideBar } from '../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import boardSlice from '../redux/slices/BoardSlices/ProjectSlice';
import { toast } from 'react-hot-toast';
import { getAllProjectBoardsApi } from '../services/boardApi';
import { getProjectByIdApi } from '../services/projectApi';
import { storeStateTypes } from '../util/types';
import { Loader } from '@mantine/core';
import LogoType from '../components/LogoType/LogoType';
import {
  NewTaskModal,
  EditTaskModal,
  DeleteTaskModal,
} from '../components/Modal';
import { EditTaskModalSlice } from '../redux/slices';

import boardImage from '../assets/img/boardImage.svg';

const Board = () => {
  const { search: queryParams } = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const outlet = useOutlet();

  const loading = useSelector(
    (state: storeStateTypes) => state.project.loading
  );

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
            data: { workspace, name: projectName, _id: id, members },
          },
        } = await getProjectByIdApi(selectedProject);

        //save data in redux
        dispatch(
          boardSlice.actions.setSelectedProjectData({
            boardData: projectData,
            id,
            name: projectName,
            wsId: workspace,
          })
        );
        dispatch(
          EditTaskModalSlice.actions.setProjectMemberData({
            projectMemberData: members,
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

  const loadingState = (
    <div className='w-full h-full grid justify-center items-center'>
      <Loader
        color='cyan'
        size='xl'
        variant='oval'
      />
    </div>
  );
  const welcomeState = (
    <div className='w-full h-full grid justify-center items-center'>
      <LogoType text='به کوئرا تسک منیجر خوش آمدید' />
    </div>
  );

  return (
    <>
      <NewTaskModal />
      <EditTaskModal />
      <DeleteTaskModal />

      <CreateWorkSpaceModal />
      <ShareProjectModal />
      <ShareWorkspaceModal />
      <CreateProjectModal />
      <div className='flex flex-row h-screen w-screen'>
        <div className='bg-[#FAFBFC] h-[100%] w-[23%] order-1'>
          <BaseSideBar>
            <BoardSideBar />
          </BaseSideBar>
        </div>
        <div className='bg-[#fafbfc]/60 h-[100%] w-[77%] order-2'>
          {!selectedProject ? (
            welcomeState
          ) : loading ? (
            loadingState
          ) : (
            <div>
              <div className='h-[170px] bg-[#fafbfc] pr-3 pl-6'>
                <HeaderBoard />
              </div>
              <div className='h-[calc(100vh-170px)] mx-4 overflow-x-auto'>
                {/* {outlet ? (
                  
                ) : (

                )} */}

                <div className='w-full h-full relative overflow-hidden'>
                  <div className='bg-[#FAFBFC] absolute -z-50 w-full h-full grid justify-center items-center'>
                    <img
                      style={{ opacity: outlet ? 0.4 : 1 }}
                      src={boardImage}
                      alt='board image'
                      className='w-[80vh] transition'
                    />
                  </div>
                  <Outlet />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Board;
