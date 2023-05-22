import {
  Button,
  Card,
  PasswordInput,
  TextInput,
  Title,
  Checkbox
} from '../../../components';

type SignUpCardProps = {};

const SignUpCard = ({}: SignUpCardProps) => {
  return (
    <Card className='flex flex-col gap-8'>
      <Title>ثبت‌نام در کوئرا تسک منیجر</Title>

      <TextInput label='نام کامل'></TextInput>
      <TextInput label='ایمیل'></TextInput>
      <PasswordInput label='رمزعبور'></PasswordInput>
      <Checkbox label='قوانین و مقررات را می‌پذیرم.' />
      <Button h={'48px'}>ثبت‌نام</Button>
    </Card>
  );
};

export default SignUpCard;
