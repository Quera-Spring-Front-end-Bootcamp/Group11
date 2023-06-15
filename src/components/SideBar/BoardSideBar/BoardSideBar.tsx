import { FiPlusSquare } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion, LogOutButton, MiniProfile, Button } from '../..';
import { SearchInput } from '../../SearchInput';
import CreateWorkSpaceModalSlice from '../../../redux/slices/ModalSlices/CreateModalSlices/CreateWorkSpaceModalSlice';
import { WorkSpaceAccordion } from '..';
import { workspaceObj } from '../../../util/types';
import { useEffect } from 'react';
import userSlice from '../../../redux/slices/userSlice';
import { toast } from 'react-hot-toast';
import { Flex } from '@mantine/core';
import { getAllWorkspacesApi } from '../../../services/workspaceApi';

const SideBar = () => {
  const dispatch = useDispatch();
  const workspaces = useSelector((state: any) => state.user.allWorkspaces);

  useEffect(() => {
    const fetchWorkSpaces = async () => {
      const {
        data: { data: wsData },
      } = await getAllWorkspacesApi();
      dispatch(userSlice.actions.setWorkspaces(wsData));
    };

    try {
      fetchWorkSpaces();
    } catch (error) {
      console.log(error);
      toast.error('مشکل در برقراری ارتباط با سرور');
    }
  }, []);

  return (
    <div className='flex flex-col justify-between mt-[31px] bg-[#FAFBFC] w-[100%] h-[calc(100%-40px)] border-l-[#AAAAAA] '>
      <div>
        <div>
          <div className=''>
            <SearchInput />
          </div>
          <div className='mb-[16px]'>
            <Button
              fullWidth={true}
              c={'#1E1E1E'}
              bg={'#D3D3D3'}
              icon={FiPlusSquare}
              sx={{
                '&:hover': {
                  backgroundColor: '#D3D3D3cc',
                },
              }}
              onClick={() =>
                dispatch(CreateWorkSpaceModalSlice.actions.onOpen())
              }>
              ساختن اسپیس جدید
            </Button>
          </div>
          {/* <div
            dir='ltr'
            className='h-[300px] overflow-auto pr-[10px] scrollbar scrollbar-w-[5px] scrollbar-track-zinc-300 scrollbar-thumb-zinc-400 scrollbar-track-rounded-3xl scrollbar-thumb-rounded-3xl scrollbar-hide relative'>
            <div dir='rtl'>as</div>
          </div> */}
        </div>
      </div>
      <Flex
        direction='column'
        gap='30px'
        className='h-full overflow-y-auto scrollbar-hide'>
        {workspaces.map((ws: workspaceObj, i: number) => (
          <WorkSpaceAccordion
            key={ws._id}
            i={i}
            _id={ws._id}
            members={ws.members}
            projects={ws.projects}
            name={ws.name}
          />
        ))}
      </Flex>

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
