import { Flex, Text } from '@mantine/core';
import { ColorInput, WorkSpaceMenu } from '../../..';
import { useState } from 'react';
import { workspaceObj } from '../../../../util/types';
import {
  BsFillCaretDownFill,
  BsThreeDots,
  BsFillCaretUpFill,
} from 'react-icons/bs';
import ProjectItem from './ProjectItem';

interface WorkSpaceAccordionProps extends workspaceObj {
  i: number;
}
const WorkSpaceAccordion = ({
  _id: wsId,
  projects,
  name,
  color,
}: WorkSpaceAccordionProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Flex className='w-full flex items-center justify-between font-semibold group cursor-pointer'>
        <Flex
          gap='8px'
          className='w-full'>
          <ColorInput
            onClick={() => {
              if (projects.length) setOpen(!open);
            }}
            height='20px'
            width='20px'
            radius='4px'
            bg={color}
            icon={
              projects.length
                ? open
                  ? BsFillCaretUpFill
                  : BsFillCaretDownFill
                : null
            }
          />
          <Text fz='16px'>{name}</Text>
          {showMenu && (
            <WorkSpaceMenu
              open={showMenu}
              setOpen={setShowMenu}
              wsId={wsId}
              wsColor={color}
            />
          )}
        </Flex>
        <div
          onClick={() => setShowMenu(true)}
          className='opacity-0 group-hover:opacity-100 hover:bg-transparent hover:scale-125 transition'>
          <BsThreeDots size={18} />
        </div>
      </Flex>
      <Flex
        direction='column'
        className={`
            transition-all
            overflow-hidden
            ${open ? 'h-full' : 'h-0'}
        `}>
        {projects.map((proj) => (
          <ProjectItem
            key={proj._id}
            _id={proj._id}
            wsId={wsId}
            name={proj.name}
          />
        ))}
      </Flex>
    </div>
  );
};

export default WorkSpaceAccordion;
