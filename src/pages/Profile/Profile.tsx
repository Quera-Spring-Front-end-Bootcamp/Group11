import { Container } from '../../components';
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
    <Container>
      <div className='flex flex-row h-screen'>
        
        <div className='bg-red-500  w-[340px] order-1'>{/* SideBar */}</div>
        {/* Main Section */}
        <div className='bg-green-500 w-[calc(100%-340px)] order-2'>
          <div className='pt-[170px] pr-[58px]'>
            <Outlet />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
