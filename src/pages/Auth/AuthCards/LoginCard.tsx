import {
  Card,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from '../../../components';
import { Link } from 'react-router-dom';

type LogInCardProps = {};

const LogInCard = ({}: LogInCardProps) => {
  return (
    <Card className='flex flex-col'>
      <Title>به کوئرا تسک منیجر خوش برگشتی :)</Title>

      <TextInput
        className='mt-[29px]'
        label='ایمیل'></TextInput>
      <PasswordInput
        className='mt-[20px]'
        label='رمزعبور'></PasswordInput>
      <Link
        className='text-primary text-12 mt-[8px] font-semibold leading-19'
        to='/auth/forgetPassword'>
        رمز عبور را فراموش کرده‌ای؟
      </Link>
      <Link to='/'>
        <Button
          className='mt-[32px]'
          h={'48px'}
          w={'100%'}>
          ورود
        </Button>
      </Link>

      <div className='flex items-center justify-center mt-[20.5px]'>
        <div className='font-normal text-16 leading-24 ml-[7px]'>
          ثبت‌نام نکرده‌ای؟
        </div>
        <Link
          className='text-primary font-bold text-16 leading-[25px]'
          to='/auth/signup'>
          ثبت‌نام
        </Link>
      </div>
    </Card>
  );
};

export default LogInCard;
