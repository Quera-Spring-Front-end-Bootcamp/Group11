import { RiLoginBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.jpg';

const About = () => {
  const members = [
    { name: 'مهدی ترکمان' },
    { name: 'ابوالفضل امیدوار' },
    { name: 'سعید فیروزی' },
    { name: 'امیرحسین حبیب نژاد' },
    { name: 'پارسا محمودزاده' },
  ];

  return (
    <div className='bg-gray-100 h-screen w-full flex flex-col items-center justify-center'>
      <div className='card w-full lg:w-5/12 p-5 rounded-md drop-shadow flex flex-col gap-5'>
        <img
          src={logo}
          alt=''
          className='w-32 h-32 mx-auto rounded-full border-2 p-1'
        />

        <div className='text-center'>
          گروه 11: <strong className='text-3xl'>NexTech</strong>
        </div>

        <div className='text-2xl'>
          منتور: <strong>سید مسیح سجادی</strong>
        </div>

        <div className='flex flex-col gap-3 font-bold'>
          <div className='font-normal'>اعضا:</div>
          {members.map((member, index) => (
            <div
              key={index}
              className='flex justify-center w-full p-4 my-2 bg-white rounded-lg'>
              <span className='font-bold'>{member.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        to='/auth'
        className='z-50 mt-5 font-bold text-white bg-black px-5 py-2 rounded-full flex items-center gap-2'>
        <RiLoginBoxLine size={20} /> ورود به تسک منیجر کوئرا
      </Link>
    </div>
  );
};

export default About;
