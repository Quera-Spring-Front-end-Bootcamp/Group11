import { useOutlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import { useEffect } from 'react';
import {Card} from '../components/Card'
import {Title} from '../components/Title'
import {Button} from '../components/Button'
import {Anchor} from '../components/Anchor'
import {TextInput} from '../components/TextInput'
import {PasswordInput} from '../components/PasswordInput'

export interface AuthPageProps {}

const Auth: React.FC<AuthPageProps> = ({}) => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  //if user enter /auth manually route automatically redirect to login page
  useEffect(() => {
    if (!outlet) navigate('login');
  });

  return (
    <>
      <Header />
      <div className='bg-gray-100 h-screen w-full flex flex-col items-center justify-center'>
        <div className='absolute bottom-0 right-0 left-0 bg-gradient-to-r from-blue-400 to-emerald-400 h-[50vh] bg-auth'></div>
        <Card className='flex flex-col gap-3 p-5'>
          <Title>به کوئرا تسک منیجر خوش برگشتی :)</Title>

          <TextInput label='ایمیل'></TextInput>
          <PasswordInput label='رمزعبور'></PasswordInput>
          <Anchor>رمز عبور را فراموش کرده‌ای؟</Anchor>
          <Button className='bg-primary'>ورود</Button>
          <div className='flex items-center justify-center gap-2'>
            <div>رمز عبور را فراموش کرده‌ای؟</div>
            <Anchor>ثبت نام</Anchor>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Auth;