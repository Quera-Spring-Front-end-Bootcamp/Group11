import { Switch } from '@mantine/core';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { themeColor } from '../../../constants';
import { Button, Title, ColorInput } from '../../../components';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCheck, BsX } from 'react-icons/bs';
import toast from 'react-hot-toast';
const Settings = () => {
  const { handleSubmit, watch, setValue } = useForm<FieldValues>({
    defaultValues: {
      selectedColor: localStorage.getItem('theme'),
      darkMode: localStorage.getItem('darkMode'),
    },
  });
  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const darModeStorage = localStorage.getItem('darkMode');
  const [checked, setChecked] = useState(
    darModeStorage && JSON.parse(darModeStorage)
  );
  const selectedColor = watch('selectedColor');
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const handleChange = () => {
    setdisabled(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = () => {
    setLoading(true);
    localStorage.setItem('theme', selectedColor);
    localStorage.setItem('darkMode', `${checked}`);
    setCustomValue('selectedColor', localStorage.getItem('theme'));
    setLoading(false);
    setdisabled(true);
    toast.success('بروز رسانی اطلاعات با موفقیت انجام شد');
  };
  return (
    <div className='flex flex-col'>
      <div>
        <Title
          fz={'31px'}
          fw={'700'}
          lh={'49px'}>
          تنظیمات
        </Title>
      </div>
      <div className='mt-[35px] w-[354px]'>
        <form
          className='flex flex-col'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-row gap-[14px]'>
            {themeColor.map((color) => (
              <div
                key={color}
                className={` ${
                  selectedColor === color
                    ? 'text-white scale-[1.4] '
                    : 'scale-100'
                }`}>
                <ColorInput
                  key={color}
                  width='20px'
                  height='20px'
                  bg={color}
                  radius='100%'
                  selected={selectedColor === color}
                  icon={selectedColor === color ? AiOutlineCheck : null}
                  onClick={() => {
                    setCustomValue('selectedColor', color);
                    handleChange();
                  }}
                />
              </div>
            ))}
          </div>
          <div className='mt-[50px]'>
            <Switch
              id='darkMode'
              onClick={() => setCustomValue('darkMode', !checked)}
              size='lg'
              checked={checked}
              onChange={(event) => {
                setChecked(event.currentTarget.checked);
                handleChange();
              }}
              thumbIcon={
                checked ? (
                  <BsCheck
                    color={'teal'}
                    size='1.1rem'
                  />
                ) : (
                  <BsX
                    color={'red'}
                    size='1.1rem'
                  />
                )
              }
              fz={'14px'}
              fw={'400'}
              lh={'22px'}
              color='teal'
              label={'حالت شب'}
              styles={() => ({
                thumb: {
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                },
                label: {
                  marginRight: '14px',
                },
              })}
            />
          </div>
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
export default Settings;
