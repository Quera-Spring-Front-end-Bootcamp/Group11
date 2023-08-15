import { useState } from 'react';
import { Button, Card, TextInput, Title } from '../../../components';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { forgetPasswordApi } from '../../../services/authApi';

const ForgetPassword = () => {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
  } = useForm<FieldValues>({
    defaultValues: {
      forgetPasswordEmail: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { forgetPasswordEmail } = data;
    if (forgetPasswordEmail === '') {
      toast.error('ایمیل خود را وارد کنید');
    } else {
      setLoading(true);
      try {
        await forgetPasswordApi(forgetPasswordEmail);

        setLoading(false);
        setDone(true);
      } catch (error: any) {
        console.log(error);

        if (error.message === 'Network Error') {
          toast.error(
            'مشکلی پیش آمده است، لطفا دوباره تلاش کنید یا اتصال اینترنت خود را بررسی نمایید'
          );
        } else {
          toast.error('کاربر با این ایمیل یافت نشد');
        }
        setLoading(false);
      }
    }
  };

  return (
    <Card className='flex flex-col gap-5 min-w-[460px]'>
      <Title className='text-center'>فراموشی رمز عبور</Title>
      {done ? (
        <>
          <p className='font-semibold text-center'>
            لینک بازیابی رمز عبور برای شما ایمیل شد. لطفا ایمیل خود را بررسی
            کنید.
          </p>
        </>
      ) : (
        <form
          className='flex flex-col gap-6'
          onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id='forgetPasswordEmail'
            register={register}
            label='ایمیل خود را وارد کنید'></TextInput>
          <Button
            loading={loading}
            type='submit'
            h={'48px'}>
            دریافت ایمیل بازیابی رمزعبور
          </Button>
        </form>
      )}
    </Card>
  );
};

export default ForgetPassword;
