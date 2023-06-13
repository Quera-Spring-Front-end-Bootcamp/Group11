import { Link } from 'react-router-dom';
import { Avatar } from '../Avatar';
import { useSelector } from 'react-redux';

const MiniProfile = () => {
  const { firstname, lastname } = useSelector((state: any) => state.user);
  const fullName = firstname && lastname && `${firstname} ${lastname}`;
  const avatarText = firstname && lastname && `${firstname[0]} ${lastname[0]}`;

  return (
    <Link to={'/profile'}>
      <div className='flex justify-center items-center gap-2 w-[fit-content] cursor-pointer'>
        {/* src.alt,color props & placeholder should be from BackEnd */}
        <Avatar
          src={null}
          alt=''
          size={'md'}
          color={'red'}
          fontSize={'12px'}
          radius={'50%'}>
          {avatarText}
        </Avatar>
        <div className='leading-25 text-[#1E1E1E] text-16 font-medium'>
          {fullName}
        </div>
      </div>
    </Link>
  );
};

export default MiniProfile;
