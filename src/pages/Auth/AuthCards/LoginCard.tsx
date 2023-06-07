import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import {
  Card,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from '../../../components';
import { BASE_URL } from '../../../constants';
import userSlice from '../../../redux/slices/userSlice';

const LogInCard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
    try {
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

      toast.success('خوش آمدید');

      //save tokens to local storage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      //save user info to redux accessible globally
      dispatch(authSlice.actions.setUserInfo({ email, settings, username }));

      setLoading(false);
      navigate('/board');
    } catch (error: any) {
      if (error.message === 'Network Error')
        toast.error(
          'مشکلی پیش آمده است، لطفا دوباره تلاش کنید یا اتصال اینترنت خود را بررسی نمایید'
        );
      if (error.response.status === 401)
        toast.error('کاربری با مشخصات وارد شده یافت نشد');
      setLoading(false);
    }
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
