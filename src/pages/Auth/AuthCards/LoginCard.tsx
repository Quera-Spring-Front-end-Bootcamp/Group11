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
    <Card className='flex flex-col gap-8'>
      <Title>به کوئرا تسک منیجر خوش برگشتی :)</Title>

      <TextInput label='ایمیل'></TextInput>
      <PasswordInput label='رمزعبور'></PasswordInput>
      <Link
        className='text-primary text-12 -mt-6'
        to='/auth/forgetPassword'>
        رمز عبور را فراموش کرده‌ای؟
      </Link>
      <Button h={'48px'}>ورود</Button>
      <div className='flex items-center justify-center gap-2'>
        <div>ثبت نام کرده ای؟</div>
        <Link
          className='text-primary font-bold'
          to='/auth/signup'>
          ثبت نام
        </Link>
      </div>
    </Card>
  );
};

export default LogInCard;
