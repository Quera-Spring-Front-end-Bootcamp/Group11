import {
  Button,
  Card,
  PasswordInput,
  TextInput,
  Title,
  Checkbox,
} from '../../../components';

type SignUpCardProps = {};

const SignUpCard = ({}: SignUpCardProps) => {
  return (
    <Card className='flex flex-col'>
      <Title>ثبت‌نام در کوئرا تسک منیجر</Title>
      <TextInput
        className='mt-[29px]'
        label='نام کامل'></TextInput>
      <TextInput
        className='mt-[20px]'
        label='ایمیل'></TextInput>
      <PasswordInput
        className='mt-[20px]'
        label='رمزعبور'></PasswordInput>
      <Checkbox
        className='mt-[20px]'
        label='قوانین و مقررات را می‌پذیرم.'
      />
      <Button
        className='mt-[20px]'
        h={'48px'}>
        ثبت‌نام
      </Button>
    </Card>
  );
};

export default SignUpCard;
