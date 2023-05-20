import {
  Button,
  Card,
  PasswordInput,
  TextInput,
  Title,
} from '../../../components';
import { Checkbox } from '@mantine/core';

type SignUpCardProps = {};

const SignUpCard = ({ }: SignUpCardProps) => {
  return (
    <Card className='flex flex-col gap-8 p-5'>
      <Title>ثبت‌نام در کوئرا تسک منیجر</Title>

      <TextInput label='نام کامل'></TextInput>
      <TextInput label='ایمیل'></TextInput>
      <PasswordInput label='رمزعبور'></PasswordInput>
      <Checkbox
      label="قوانین و مقررات را می‌پذیرم."
      />
      <Button className='bg-primary h-40'>ثبت نام</Button>
    </Card>
  );
};

export default SignUpCard;
