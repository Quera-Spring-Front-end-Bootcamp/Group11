import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Card,
  PasswordInput,
  TextInput,
  Title,
  Checkbox,
} from '../../../components';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserApi } from '../../../services/authApi';

const SignUpCard = () => {
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
      await registerUserApi({
        email,
        password,
        username: email.split('@')[0],
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id='fullName'
          errors={errors}
          required
          register={register}
          className='mt-[29px]'
          label='نام کامل'
        />
        <TextInput
          id='email'
          errors={errors}
          required
          register={register}
          className='mt-[20px]'
          label='ایمیل'
        />
        <PasswordInput
          id='password'
          required
          errors={errors}
          register={register}
          className='mt-[20px]'
          label='رمزعبور'
        />
        <Checkbox
          onInvalid={(e) =>
            e.currentTarget.setCustomValidity('مثل همیشه قوانین رو نخونده بپذیر 😃')
          }
          required
          className='mt-[20px]'
          label='قوانین و مقررات را می‌پذیرم.'
        />
        <Button
          loading={loading}
          type='submit'
          className='mt-[20px]'
          h={'48px'}>
          ثبت‌نام
        </Button>
      </form>
    </Card>
  );
};

export default SignUpCard;
