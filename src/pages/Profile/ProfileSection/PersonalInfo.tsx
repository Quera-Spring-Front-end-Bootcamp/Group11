import { Button as MantineBtn } from '@mantine/core';
import { useForm, FieldValues } from 'react-hook-form';

import { Button, Avatar, TextInput, Title } from '../../../components';

const PersonalInfo = () => {
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
          اطلاعات فردی
        </Title>
      </div>
      <div className='flex flex-row items-center mt-[35px]'>
        <div>
          <Avatar
            color={'red'} //from BackEnd
            fontSize={'35px'}
            className='p-0 m-0'
            size={'100px'}
            radius={'50%'}>
            NM {/* from BackEnd */}
          </Avatar>
        </div>
        <div className='flex flex-col mr-[16px]'>
          <MantineBtn
            color={'cyan'}
            p={'10px'}
            variant='outline'
            h={'50px'}
            radius={'8px'}
            fz={'20px'}
            fw={'500'}
            lh={'31px'}>
            ویرایش تصویر پروفایل
          </MantineBtn>
          <div className='mt-[12px] text-[#8A8989] font-normal text-12 leading-19'>
            این تصویر برای عموم قابل نمایش است.
          </div>
        </div>
      </div>
      <div className='w-[354px] mt-[34px]'>
        <form
          className='flex flex-col '
          onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id='firstName'
            register={register}
            label='نام'
          />
          <TextInput
            id='lastName'
            register={register}
            label='نام خانوادگی'
            className='mt-[20px]'
          />
          <TextInput
            id='tel'
            type='tel'
            register={register}
            label='شماره موبایل'
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
export default PersonalInfo;
