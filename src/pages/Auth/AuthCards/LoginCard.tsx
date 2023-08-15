import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import {
  Card,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from '../../../components';
import userSlice from '../../../redux/slices/UserSlice/UserSlice';
import { loginApi } from '../../../services/authApi';
import { getUserApi } from '../../../services/userApi';

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
      const { data: loginData } = await loginApi(emailOrUsername, password);

      const {
        data: {
          accessToken,
          refreshToken,
          toBeSendUserData: { _id: id },
        },
      } = loginData;

      const {
        data: { data: userData },
      } = await getUserApi(id);

      const { email, profile_url, username, firstname, lastname, phone } =
        userData;

      //save tokens to local storage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      //save user info to redux accessible globally
      dispatch(
        userSlice.actions.setUserInfoByRequest({
          email,
          id,
          username,
          firstname,
          lastname,
          phone,
          profile_url,
        })
      );

      toast.success('خوش آمدید');
      setLoading(false);
      navigate('/');
    } catch (error: any) {
      console.log(error);
      if (error.message === 'Network Error')
        toast.error(
          'مشکلی پیش آمده است، لطفا دوباره تلاش کنید یا اتصال اینترنت خود را بررسی نمایید'
        );
      toast.error('ورود ناموفق، لطفا دوباره تلاش کنید');
      setLoading(false);
    }
  };
  return (
    <Card className='flex flex-col'>
      <Title>به تسک مستر خوش برگشتی</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id='emailOrUsername'
          register={register}
          errors={errors}
          required
          className='mt-[29px]'
          label='ایمیل یا نام کاربری'></TextInput>
        <PasswordInput
          id='password'
          register={register}
          errors={errors}
          required
          className='mt-[20px]'
          label='رمزعبور'></PasswordInput>

        <Link
          className='text-primary text-12 mt-[8px] font-semibold leading-19 self-start'
          to='/auth/forgetPassword'>
          رمز عبور را فراموش کرده‌ای؟
        </Link>

        <Button
          loading={loading}
          type='submit'
          h={'48px'}
          w={'100%'}
          mt='32px'>
          ورود
        </Button>
      </form>

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
