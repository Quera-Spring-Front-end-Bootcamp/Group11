import { useForm, FieldValues } from 'react-hook-form';

import { Button, TextInput, PasswordInput, Title } from '../../../components';

const AccountInfo = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: '', //from BackEnd
      lastName: '', //from BackEnd
      tel: '', //from BackEnd
    },
  });
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className='flex flex-col'>
      <div>
        <Title
          fz={'31px'}
          fw={'700'}
          lh={'49px'}>
          اطلاعات حساب
        </Title>
      </div>
      <div className='mt-[35px] w-[354px]'>
        <form
          className='flex flex-col'
          onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id='email'
            type='email'
            register={register}
            label='ایمیل'
          />
          <div className='relative'>
            <PasswordInput
              id='password'
              register={register}
              label='رمز عبور'
              className='w-[250px] mt-[20px]'
            />
            <Button
              w={'110px'}
              className='absolute left-0 top-[51px]'>
              احراز هویت
            </Button>
          </div>
          <TextInput
            id='userName'
            register={register}
            label='نام کاربری'
            className='mt-[20px]'
          />
          <Button
            className='mt-[48px]'
            type='submit'>
            ثبت تغییرات
          </Button>
        </form>
      </div>
    </div>
  );
};
export default AccountInfo;
