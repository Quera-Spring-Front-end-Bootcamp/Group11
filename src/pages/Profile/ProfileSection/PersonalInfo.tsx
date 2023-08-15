import { Loader } from '@mantine/core';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

import { Button, Avatar, TextInput, Title } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { updateUserInfoApi } from '../../../services/userApi';
import toast from 'react-hot-toast';
import userSlice from '../../../redux/slices/UserSlice/UserSlice';
import { storeStateTypes } from '../../../util/types';
import axios from 'axios';
const PersonalInfo = () => {
  const dispatch = useDispatch();

  const { firstname, lastname, phone, id, profile_url } = useSelector(
    (state: storeStateTypes) => state.user
  );

  const avatarText = firstname && lastname && `${firstname[0]} ${lastname[0]}`;

  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [uploading, setUploading] = useState(false);

  const handleChange = () => {
    setdisabled(false);
  };
  const { register, handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      firstname,
      lastname,
      phone,
    },
  });

  useEffect(() => {
    setValue('firstname', firstname);
    setValue('lastname', lastname);
    setValue('phone', phone);
  }, [firstname, lastname, phone, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { firstname, lastname, phone } = data;
    setLoading(true);
    try {
      const { data: apiData } = await updateUserInfoApi(id, {
        firstname,
        lastname,
        phone,
      });

      dispatch(
        userSlice.actions.setUserPersonaInfo({ firstname, lastname, phone })
      );
      console.log(apiData);
      toast.success('بروز رسانی اطلاعات با موفقیت انجام شد');
    } catch (error) {
      console.log(error);
      toast.error('بروز رسانی اطلاعات با مشکل مواجه شد');
    }

    setLoading(false);
    setdisabled(true);
  };
  const uploadImage = async (filesInput: ChangeEvent<HTMLInputElement>) => {
    //cloadinary keys for Api communication
    const preset_key = 'gqxu362e';
    const cloudName = 'dcn5dnfrd';

    //get the selected file details
    if (!filesInput.target.files) return;
    const file = filesInput.target.files[0];

    //create a FormData instance and append needed
    //data to it, as cloadinary only accepts formData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    try {
      setUploading(true);

      //upload to cloudinary
      const { data: uploadResponse } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      //update user profile url in DB
      await updateUserInfoApi(id, {
        profile_url: uploadResponse.secure_url,
      });

      //update user profile url in redux
      dispatch(
        userSlice.actions.setProfilePicture({ url: uploadResponse.secure_url })
      );

      toast.success('تصویر پروفایل با موفقیت تغییر یافت');
      setUploading(false);
    } catch (error) {
      toast.error('مشکلی پیش آمده است، لطفا مجددا تلاش فرمایید');
      console.log(error);
    }
  };

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
            src={!uploading ? profile_url : undefined}
            color={'red'}
            label={`${firstname} ${lastname}`}
            fontSize={'35px'}
            className='p-0 m-0'
            size={'100px'}
            radius={'50%'}>
            {uploading ? <Loader /> : avatarText}
          </Avatar>
        </div>
        <div className='flex flex-col mr-[16px] items-center'>
          <label
            className={`
              text-[20px]
              p-2
              h-12
              border
              rounded-[8px]
              font-semibold
              hover:bg-[#15abbf0f]
              ${
                uploading
                  ? 'border-[#393b3c50] hover:bg-[#0000] text-[#393b3c4a] cursor-progress'
                  : 'border-[#15aabf] hover:bg-[#15abbf0f] text-[#15aabf] cursor-pointer'
              }
            `}>
            {!uploading && (
              <input
                className='hidden'
                type='file'
                onChange={(e) => uploadImage(e)}
              />
            )}
            ویرایش تصویر پروفایل
          </label>
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
            onChange={handleChange}
            id='firstname'
            register={register}
            label='نام'
          />
          <TextInput
            onChange={handleChange}
            id='lastname'
            register={register}
            label='نام خانوادگی'
            className='mt-[20px]'
          />
          <TextInput
            placeholder={`current phone: ${phone}`}
            onChange={handleChange}
            id='phone'
            type='tel'
            register={register}
            label='شماره موبایل'
            className='mt-[20px]'
          />
          <Button
            loading={loading}
            disabled={disabled}
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
