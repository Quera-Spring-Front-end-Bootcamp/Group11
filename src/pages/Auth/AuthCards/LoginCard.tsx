import { FieldValues, useForm } from 'react-hook-form';
import {
  Card,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from '../../../components';
import { Link } from 'react-router-dom';

type LogInCardProps = {};

const LogInCard = ({}: LogInCardProps) => {
  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    // setValue, //set custom value by ID
    getValues, //get value by id
    // watch, //watch value for change
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <Card className='flex flex-col'>
      <Title>به کوئرا تسک منیجر خوش برگشتی :)</Title>

      <TextInput
        id='email'
        register={register}
        className='mt-[29px]'
        label='ایمیل'></TextInput>
      <PasswordInput
        id='password'
        register={register}
        className='mt-[20px]'
        label='رمزعبور'></PasswordInput>
      <Link
        className='text-primary text-12 mt-[8px] font-semibold leading-19'
        to='/auth/forgetPassword'>
        رمز عبور را فراموش کرده‌ای؟
      </Link>
      <Link to='/'>
        <Button
          onClick={() => {
            console.log(getValues()); //demonstration 
          }}
          className='mt-[32px]'
          h={'48px'}
          w={'100%'}>
          ورود
        </Button>
      </Link>

      <div className='flex items-center justify-center mt-[20.5px]'>
        <div className='font-normal text-16 leading-24 ml-[7px]'>
          ثبت‌نام نکرده‌ای؟
        </div>
        <Link
          className='text-primary font-bold text-16 leading-[25px]'
          to='/auth/signup'>
          ثبت‌نام
        </Link>
      </div>
    </Card>
  );
};

export default LogInCard;
