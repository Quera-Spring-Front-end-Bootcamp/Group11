import { Flex, Text } from '@mantine/core';
import { ColorInput, WorkSpaceMenu } from '../../..';
import { workSpaceColors } from '../../../../constants';
import { useState } from 'react';
import { workspaceObj } from '../../../../util/types';
import { BsThreeDots } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

interface WorkSpaceAccordionProps extends workspaceObj {
  i: number;
}
const WorkSpaceAccordion = ({
  _id: wsId,
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
      search: `?projectId=${id}&workspaceId=${wsId}`,
    });
  };
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div>
      <Flex className='w-full flex items-center justify-between font-semibold group cursor-pointer'>
        <Flex
          gap='8px'
          className='w-full'>
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
          <WorkSpaceMenu
            open={showMenu}
            setOpen={setShowMenu}
            wsId={wsId}
          />
        </Flex>
        <div
          onClick={() => setShowMenu(true)}
          className='hidden group-hover:block hover:bg-transparent hover:scale-125 transition'>
          <BsThreeDots size={18} />
        </div>
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
