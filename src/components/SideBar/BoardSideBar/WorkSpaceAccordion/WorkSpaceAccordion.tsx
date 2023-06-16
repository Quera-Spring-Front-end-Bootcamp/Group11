import { Flex, Text } from '@mantine/core';
import { ColorInput, WorkSpaceMenu } from '../../..';
import { workSpaceColors } from '../../../../constants';
import { useState } from 'react';
import { workspaceObj } from '../../../../util/types';
import {
  BsFillCaretDownFill,
  BsThreeDots,
  BsFillCaretUpFill,
} from 'react-icons/bs';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
  const [URLSearchParams] = useSearchParams();
  console.log(URLSearchParams.get('projectId'));

  const onProjectClickHandler = (id: string, name: string) => {
    navigate({
      pathname: location.pathname,
      search: `?projectId=${id}&workspaceId=${wsId}`,
    });
  };
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Flex className='w-full flex items-center justify-between font-semibold group cursor-pointer'>
        {/* {projects.length ? (
          <BsFillCaretDownFill
            onClick={() => {
              setOpen(!open);
            }}
            className={`

              transition-all
              ${open ? 'rotate-180' : 'rotate-0'}
              `}
          />
        ) : null} */}
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
            bg={
              workSpaceColors[i] ? workSpaceColors[i] : workSpaceColors[i + 1]
            }
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
            />
          )}
        </Flex>
        <div
          onClick={() => setShowMenu(true)}
          className='hidden group-hover:block hover:bg-transparent hover:scale-125 transition'>
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
          <Text
            onClick={() => onProjectClickHandler(proj._id, proj.name)}
            key={proj._id}
            className={`
              cursor-pointer
              mr-[20px]
              mt-[20px]
              hover:bg-[#e1eff4]
              py-1
              px-2 
              rounded-4
              ${
                URLSearchParams.get('projectId') === proj._id
                  ? 'bg-[#b8d6e0]'
                  : ''
              }
              `}>
            {proj.name}
          </Text>
        ))}
      </Flex>
    </div>
  );
};

export default WorkSpaceAccordion;
