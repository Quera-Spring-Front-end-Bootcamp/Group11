import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  Card,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from '../../../components';
import { BASE_URL } from '../../../constants';
import authSlice from '../../../redux/slices/authSlice';

type LogInCardProps = {};

const LogInCard = ({}: LogInCardProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const { emailOrUsername, password } = data;

    const { data: loginData } = await axios.post(`${BASE_URL}/auth/login`, {
      emailOrUsername,
      password,
    });

    const {
      data: {
        accessToken,
        refreshToken,
        toBeSendUserData: { email, settings, username },
      },
    } = loginData;
    
    //save tokens to local storage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    //save user info to redux accessible globally
    dispatch(authSlice.actions.setUserInfo({ email, settings, username }));
    setLoading(false);
  };
  return (
    <Card className='flex flex-col'>
      <Title>به کوئرا تسک منیجر خوش برگشتی :)</Title>
      <TextInput
        id='emailOrUsername'
        register={register}
        className='mt-[29px]'
        label='ایمیل یا نام کاربری'></TextInput>
      <PasswordInput
        id='password'
        register={register}
        className='mt-[20px]'
        label='رمزعبور'></PasswordInput>

      <Link
        className='text-primary text-12 mt-[8px] font-semibold leading-19 self-start'
        to='/auth/forgetPassword'>
        رمز عبور را فراموش کرده‌ای؟
      </Link>
      <Link
        to='/board'
        className='mt-[32px]'>
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
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
