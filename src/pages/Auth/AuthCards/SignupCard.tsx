import { FieldValues, useForm } from 'react-hook-form';
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
  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    // setValue, //set custom value by ID
    getValues, //get value by id
    // watch, //watch value for change
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });
  return (
    <Card className='flex flex-col'>
      <Title>ثبت‌نام در کوئرا تسک منیجر</Title>
      <TextInput
        id='fullName'
        register={register}
        className='mt-[29px]'
        label='نام کامل'></TextInput>
      <TextInput
        id='email'
        register={register}
        className='mt-[20px]'
        label='ایمیل'></TextInput>
      <PasswordInput
        id='password'
        register={register}
        className='mt-[20px]'
        label='رمزعبور'></PasswordInput>
      <Checkbox
        className='mt-[20px]'
        label='قوانین و مقررات را می‌پذیرم.'
      />
      <Button
        onClick={() => {
          console.log(getValues());
        }}
        className='mt-[20px]'
        h={'48px'}>
        ثبت‌نام
      </Button>
    </Card>
  );
};

export default SignUpCard;
