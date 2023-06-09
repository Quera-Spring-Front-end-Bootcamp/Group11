import { Flex, Text } from '@mantine/core';
import { Button } from '../../';
import { ColorInput } from '../..';
import { workSpaceColors } from '../../../constants';
import { useEffect } from 'react';
import { User, workspaceObj } from '../../../util/types';
import { BsThreeDots } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import boardSlice from '../../../redux/slices/BoardSlices/BoardSlice';

interface WorkSpaceAccordionProps extends workspaceObj {
  i: number;
}
const WorkSpaceAccordion = ({
  _id: id,
  projects,
  members,
  name,
  i,
}: WorkSpaceAccordionProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onProjectClickHandler = (id: string, name: string) => {
    navigate({
      pathname: location.pathname,
      search: `?projectId=${id}`,
    });
  };
  return (
    <div>
      <Flex className='w-full flex items-center justify-between font-semibold group cursor-pointer '>
        <Flex gap='8px'>
          <ColorInput
            height='20px'
            width='20px'
            radius='4px'
            notClickable
            bg={
              workSpaceColors[i] ? workSpaceColors[i] : workSpaceColors[i + 1]
            }
          />

          <Text fz='16px'>{name}</Text>
        </Flex>

        <Button
          p={0}
          h={'auto'}
          variant='subtle'
          bg={'transparent'}
          c={'#323232'}
          className='hidden group-hover:block hover:bg-transparent'>
          <BsThreeDots size={16} />
        </Button>
      </Flex>
      {projects.map((proj) => (
        <Text
          onClick={() => onProjectClickHandler(proj._id, proj.name)}
          key={proj._id}
          className='cursor-pointer mr-[25px] my-[25px] bg-[#E9F9FF] hover:bg-[#e1eff4] py-1 px-2 rounded-4'>
          {proj.name}
        </Text>
      ))}
    </div>
  );
};

export default WorkSpaceAccordion;
