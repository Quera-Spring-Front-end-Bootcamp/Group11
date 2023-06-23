import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { Button, TextInput, PasswordInput, Title } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfoApi } from '../../../services/userApi';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { userSlice } from '../../../redux/slices/';
import { storeStateTypes } from '../../../util/types';

const AccountInfo = () => {
  const dispatch = useDispatch();

  const { email, username, id } = useSelector(
    (state: storeStateTypes) => state.user
  );
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleChange = () => {
    setDisabled(false);
  };

  const { register, handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      email,
      password: '',
      username,
    },
  });
  useEffect(() => {
    setValue('email', email);
    setValue('username', username);
  }, [email, setValue, username]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const { email, username } = data;
    try {
      await updateUserInfoApi(id, { email, username });
      dispatch(userSlice.actions.setUserAccountInfo({ email, username }));
      toast.success('بروز رسانی اطلاعات با موفقیت انجام شد');
    } catch (error) {
      console.log(error);
      toast.error('بروز رسانی اطلاعات با مشکل مواجه شد');
    }
    setLoading(false);
    setDisabled(true);
  };
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
            autoComplete='off'
            onChange={handleChange}
            id='email'
            type='email'
            register={register}
            label='ایمیل'
          />
          <div className='relative'>
            <PasswordInput
              autoComplete='off'
              id='password'
              register={register}
              label='رمز عبور'
              className='w-[250px] mt-[20px]'
            />
            <Button
              w={'110px'}
              className='absolute h-[36px] bottom-0 left-0'
              sx={{ borderRadius: '6px 0 0 6px' }}>
              احراز هویت
            </Button>
          </div>
          <TextInput
            autoComplete='off'
            onChange={handleChange}
            id='username'
            register={register}
            label='نام کاربری'
            className='mt-[20px]'
          />
          <Button
            disabled={disabled}
            loading={loading}
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
