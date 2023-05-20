import {
  Anchor,
  Button,
  Card,
  PasswordInput,
  TextInput,
  Title,
} from '../../../components';

type SignUpCardProps = {};

const SignUpCard = ({}: SignUpCardProps) => {
  return (
    <Card className='flex flex-col gap-3 p-5'>
      <Title>به کوئرا تسک منیجر خوش برگشتی :)</Title>

      <TextInput label='ایمیل'></TextInput>
      <PasswordInput label='رمزعبور'></PasswordInput>
      <Anchor>رمز عبور را فراموش کرده‌ای؟</Anchor>
      <Button className='bg-primary'>ورود</Button>
      <div className='flex items-center justify-center gap-2'>
        <div>رمز عبور را فراموش کرده‌ای؟</div>
        <Anchor>ثبت نام</Anchor>
      </div>
    </Card>
  );
};

export default SignUpCard;
