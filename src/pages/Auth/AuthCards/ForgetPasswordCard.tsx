import {
  Button,
  Card,
  TextInput,
  Title,
} from '../../../components';

type ForgetPasswordProps = {};

const ForgetPassword = ({}: ForgetPasswordProps) => {
  return (
    <Card className='flex flex-col gap-8 p-5 min-w-[460px]'>
      <Title className="text-center">فراموشی رمز عبور</Title>

      <TextInput label='ایمیل خود را وارد کنید'></TextInput>
      <Button className='bg-primary h-48 -mt-3'>دریافت ایمیل بازیابی رمزعبور</Button>
    </Card>
  );
};

export default ForgetPassword;
