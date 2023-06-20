import { Link, useNavigate } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { Button } from '../../../components';
import { profileSideBarNavItems } from '../../../constants';
import { useSelector } from 'react-redux';
import { storeStateTypes } from '../../../util/types';

interface ProfileSideBarProp {
  profileSection: string | undefined;
}
const ProfileSideBar = ({ profileSection }: ProfileSideBarProp) => {
  const navigate = useNavigate();
  const { selectedProjectId, selectedWorkspaceId } = useSelector(
    (state: storeStateTypes) => state.board
  );
  const onBackClickHandler = () => {
    navigate({
      pathname: '/board/TaskList',
      search:
        selectedProjectId &&
        `?projectId=${selectedProjectId}&workspaceId=${selectedWorkspaceId}`,
    });
  };
  return (
    <div className='flex flex-col  w-[100%] h-[100%] mt-[70px]'>
      <Button
        w={'110px'}
        radius={'8px'}
        py={'4px'}
        fz={'20px'}
        fw={'500'}
        onClick={onBackClickHandler}
        leftIcon={<HiArrowRight size={'1.2rem'} />}
        styles={() => ({
          root: {
            '&:hover': {
              backgroundColor: '#277576',
            },
          },
          leftIcon: {
            marginRight: '0px',
            marginLeft: '8px',
          },
        })}>
        بازگشت
      </Button>
      <ul className='flex flex-col gap-[36px] mt-[40px]'>
        {profileSideBarNavItems.map(({ id, icon: Icon, title }) => {
          return (
            <li
              className='cursor-pointer'
              key={id}>
              <Link to={id}>
                <div
                  className={
                    'flex flex-row items-center gap-[11px] py-1 px-2 rounded-4 ' +
                    (profileSection === id && 'bg-[#C5FFFF]')
                  }>
                  <Icon size='2rem' />
                  <span className='text-[20px] leading-[31px] font-[600]'>
                    {title}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ProfileSideBar;
