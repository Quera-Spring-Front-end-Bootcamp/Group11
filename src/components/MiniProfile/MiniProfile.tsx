import { Link } from 'react-router-dom';
import { Avatar } from '../Avatar';

const MiniProfile = () => {
  return (
    <Link to={'/profile'}>
      <div
        className='flex justify-center items-center gap-2 w-[fit-content] cursor-pointer'>
        {/* src.alt,color props & placeholder should be from BackEnd */}
        <Avatar
          src={null}
          alt=''
          size={'md'}
          color={'red'} fontSize={'12px'}
          radius={'50%'}>
          NM
        </Avatar>
        <div className='leading-25 text-[#1E1E1E] text-16 font-medium'>
          {/* user name should be from BackEnd */}
          نیلوفر موجودی
        </div>
      </div>
    </Link>
  );
};

export default MiniProfile;
