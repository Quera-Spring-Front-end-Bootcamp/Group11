import { useState } from 'react';
import { Button, Card, TextInput, Title } from '../../../components';
import { FieldValues, useForm } from 'react-hook-form';

type ForgetPasswordProps = {};

const ForgetPassword = ({}: ForgetPasswordProps) => {
  const [done, setDone] = useState(false);
  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    // setValue, //set custom value by ID
    getValues, //get value by id
    // watch, //watch value for change
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      forgetPasswordEmail: '',
    },
  });

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
        <>
          <TextInput
            id='forgetPasswordEmail'
            register={register}
            label='ایمیل خود را وارد کنید'></TextInput>
          <Button
            onClick={() => {
              setDone(true);
              console.log(getValues());
            }}
            h={'48px'}>
            دریافت ایمیل بازیابی رمزعبور
          </Button>
        </>
      )}
    </Card>
  );
};

export default ForgetPassword;
