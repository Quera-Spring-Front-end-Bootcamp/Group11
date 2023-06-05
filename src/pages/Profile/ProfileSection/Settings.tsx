import { Switch } from '@mantine/core';
import { useForm, FieldValues } from 'react-hook-form';
import { themeColor } from '../../../constants';
import { Button, Title, ColorInput } from '../../../components';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCheck, BsX } from 'react-icons/bs';
const Settings = () => {
  const {
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      selectedColor: '',
      darkMode: false, //from BackEnd
    },
  });
  const [checked, setChecked] = useState(false);
  console.log(checked)
  const selectedColor = watch('selectedColor');
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data) => console.log(data);

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
                  onClick={() => setCustomValue('selectedColor', color)}
                />
              </div>
            ))}
          </div>
          <div className='mt-[50px]'>
            <Switch
              onClick={() => setCustomValue('darkMode', checked)}
              size='lg'
              checked={checked}
              onChange={(event) => {
                setChecked(event.currentTarget.checked);
              }}
              thumbIcon={
                checked ? (
                  <BsCheck
                    color={'teal'}
                    size='1rem'
                  />
                ) : (
                  <BsX
                    color={'red'}
                    size='1rem'
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
