import { Text } from '@mantine/core';
import { useState } from 'react';
import { Project } from '../../../../util/types';
import { BsThreeDots } from 'react-icons/bs';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ProjectMenu } from '../../../Menu';
import { useDispatch } from 'react-redux';
import { ShareProjectModalSlice } from '../../../../redux/slices';

interface ProjectItemProps extends Project {
  wsId: string;
}
const ProjectItem = ({ _id: id, wsId, name }: ProjectItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [URLSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const onProjectClickHandler = (id: string) => {
    dispatch(ShareProjectModalSlice.actions.setProject({ projectId: id }));
    navigate({
      pathname: location.pathname,
      search: `?projectId=${id}&workspaceId=${wsId}`,
    });
  };
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <>
      {showMenu && (
        <ProjectMenu
          projectId={id}
          wsId={wsId}
          open={showMenu}
          setOpen={setShowMenu}
        />
      )}
      <Text
        onClick={() => onProjectClickHandler(id)}
        className={`
              group
              cursor-pointer
              mr-[20px]
              mt-[20px]
              hover:bg-[#e1eff4]
              py-1
              px-2 
              rounded-4
              flex 
              justify-between
              items-center
              ${URLSearchParams.get('projectId') === id ? 'bg-[#e1eff4]' : ''}
              `}>
        {name}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(true);
          }}
          className='opacity-0 group-hover:opacity-100 transition'>
          <BsThreeDots size={18} />
        </div>
      </Text>
    </>
  );
};

export default ProjectItem;
