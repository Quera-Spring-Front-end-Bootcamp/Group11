import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Card,
  PasswordInput,
  TextInput,
  Title,
  Checkbox,
} from '../../../components';
import { BASE_URL } from '../../../constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SignUpCardProps = {};

const SignUpCard = ({}: SignUpCardProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    const { fullName, email, password } = data;
    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        username: email.split('@')[0],
        email,
        password,
        firstname: fullName.split(' ')[0],
        lastname: fullName.split(' ')[1],
      });
      toast.success('ثبت‌نام با موفقیت انجام شد، می‌توانید وارد شوید');

      navigate('/auth/login');
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      if (error.message === 'Network Error')
        toast.error(
          'مشکلی پیش آمده است، لطفا دوباره تلاش کنید یا اتصال اینترنت خود را بررسی نمایید'
        );
      if (error.response.status === 401)
        toast.error(
          'متاسفانه ثبت‌نام موفقیت آمیز نبود، لطفا مجددا تلاش نمایید'
        );
      setLoading(false);
    }
  };

  return (
    <Card className='flex flex-col'>
      <Title>ثبت‌نام در کوئرا تسک منیجر</Title>
      <TextInput
        id='fullName'
        register={register}
        className='mt-[29px]'
        label='نام کامل'
      />
      <TextInput
        id='email'
        register={register}
        className='mt-[20px]'
        label='ایمیل'
      />
      <PasswordInput
        id='password'
        register={register}
        className='mt-[20px]'
        label='رمزعبور'
      />
      <Checkbox
        className='mt-[20px]'
        label='قوانین و مقررات را می‌پذیرم.'
      />
      <Button
        loading={loading}
        // onClick={() => handleSubmit(onSubmit)}
        onClick={handleSubmit(onSubmit)}
        className='mt-[20px]'
        h={'48px'}>
        ثبت‌نام
      </Button>
    </Card>
  );
};

export default SignUpCard;
