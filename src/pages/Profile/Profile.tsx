import { useEffect } from 'react';
import { Outlet, useNavigate, useOutlet } from 'react-router';

const Profile = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  //if user enter /profile manually route automatically redirect to Personal Info
  useEffect(() => {
    if (!outlet) navigate('personalInfo');
  });

  return (
    <div className='flex flex-row h-screen w-screen'>
      <div className='bg-[#0e75dc] h-[100%] w-[23%] order-1'>
        {/* SideBar */}
      </div>
      {/* Main Section */}
      <div className='bg-[#FAFBFC] h-[100%] w-[77%] order-2'>
        <div className='pt-[15vh] pr-[58px]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
