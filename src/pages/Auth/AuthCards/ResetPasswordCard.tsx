import { useState } from 'react';
import { Button, Card, TextInput, Title } from '../../../components';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPasswordApi } from '../../../services/authApi';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
  } = useForm<FieldValues>({
    defaultValues: {
      newPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const { newPassword } = data;
    const { token } = Object.fromEntries([...searchParams]);

    try {
      await resetPasswordApi(newPassword, token);
      toast.success('کلمه عبور با موفقیت تغییر یافت');
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
      <form
        className='flex flex-col gap-6'
        onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id='newPassword'
          register={register}
          label='رمز جدید'></TextInput>
        <Button
          loading={loading}
          type='submit'
          h={'48px'}>
          تغییر رمز
        </Button>
      </form>
    </Card>
  );
};

export default ResetPassword;
