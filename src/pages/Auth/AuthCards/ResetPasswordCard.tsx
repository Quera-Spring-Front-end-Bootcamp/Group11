import { useState } from 'react';
import { Button, Card, TextInput, Title } from '../../../components';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BASE_URL } from '../../../constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      newPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const { newPassword } = data;

    try {
      await axios.post(`${BASE_URL}/auth/reset-password`, {
        password: newPassword,
        token: localStorage.getItem('resetToken'),
      });
      toast.success('کلمه عبور با موفقیت تغییر یافت');
      localStorage.removeItem('resetToken');
      navigate('/auth/login');
    } catch (error: any) {
      console.log(error);

      if (error.message === 'Network Error') {
        toast.error(
          'مشکلی پیش آمده است، لطفا دوباره تلاش کنید یا اتصال اینترنت خود را بررسی نمایید'
        );
      } else {
        toast.error('تغییر کلمه عبور موفقیت آمیز نبود، لطفا مجددا تلاش نمایید');
      }
      setLoading(false);
    }
  };

  return (
    <Card className='flex flex-col gap-5 min-w-[460px]'>
      <Title className='text-center'>فراموشی رمز عبور</Title>

      <TextInput
        id='newPassword'
        register={register}
        label='رمز جدید'></TextInput>
      <Button
        loading={loading}
        onClick={handleSubmit(onSubmit)}
        h={'48px'}>
        تغییر رمز
      </Button>
    </Card>
  );
};

export default ResetPassword;
