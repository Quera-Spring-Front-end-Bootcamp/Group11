import { BaseSideBar, ProfileSideBar } from '../../components/SideBar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const profileSection = useLocation().pathname.split('/').pop();
  console.log(profileSection);
  useEffect(() => {
    if (profileSection === 'profile' || profileSection === '')
      navigate('personalInfo');
  });
  return (
    <div className='flex flex-row h-screen w-screen'>
      <div className='bg-[#FAFBFC] h-[100%] w-[23%] order-1'>
        <BaseSideBar>
          <ProfileSideBar profileSection={profileSection} />
        </BaseSideBar>
      </div>
      <div className='bg-[#FAFBFC] h-[100%] w-[77%] order-2'>
        <div className='pt-[15vh] pr-[58px]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
