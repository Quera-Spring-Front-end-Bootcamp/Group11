import { useState } from 'react';
import { Button, Card, TextInput, Title } from '../../../components';

type ForgetPasswordProps = {};

const ForgetPassword = ({}: ForgetPasswordProps) => {
  const [done, setDone] = useState(false);
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
          <TextInput label='ایمیل خود را وارد کنید'></TextInput>
          <Button
            onClick={() => setDone(true)}
            h={'48px'}>
            دریافت ایمیل بازیابی رمزعبور
          </Button>
        </>
      )}
    </Card>
  );
};

export default ForgetPassword;
