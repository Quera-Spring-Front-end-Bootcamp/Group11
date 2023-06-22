import { FiPlusSquare } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { LogOutButton, MiniProfile, Button } from '../..';
import { SearchInput } from '../../SearchInput';
import { CreateWorkSpaceModalSlice } from '../../../redux/slices';
import { WorkSpaceAccordion } from '..';
import { storeStateTypes, workspaceObj } from '../../../util/types';
import { useEffect, useState } from 'react';
import userSlice from '../../../redux/slices/UserSlice/UserSlice';
import { toast } from 'react-hot-toast';
import { Flex, Text } from '@mantine/core';
import { getAllWorkspacesApi } from '../../../services/workspaceApi';

import { BsSearch, BsFillCaretDownFill } from 'react-icons/bs';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const workspaces = useSelector(
    (state: storeStateTypes) => state.user.allWorkspaces
  );

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
    <div className='flex flex-col justify-between mt-[31px] bg-[#FAFBFC] w-[100%] h-[calc(100%-100px)] border-l-[#AAAAAA] '>
      <Flex
        direction='column'
        gap='13px'>
        <Flex
          onClick={() => setOpen(!open)}
          justify='space-between'
          className='select-none cursor-pointer'>
          <Text
            fz='16px'
            weight='bold'>
            ورک اسپیس‌ها
          </Text>
          <Flex gap='20px'>
            <BsSearch />
            <BsFillCaretDownFill
              className={`
              transition-all
              ${open ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </Flex>
        </Flex>
        <div className=''>
          <SearchInput pholder='جستجو در ورک‌اسپیس‌ها' />
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
      </Flex>
      <hr />
      <div className='relative overflow-y-auto scrollbar-hide py-4 h-full'>
        <Flex
          direction='column'
          gap='30px'
          className={`
            scrollbar-hide  
            transition-all
            ${
              open
                ? 'h-full overflow-y-auto opacity-100'
                : 'h-0 overflow-hidden opacity-0'
            }
            `}>
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
      </div>
      <hr />
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
