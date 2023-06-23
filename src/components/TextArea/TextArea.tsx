import { Textarea as MantineTextArea } from '@mantine/core';
import { TextareaProps as MantineTextAreaProps } from '@mantine/core';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface TextareaProps extends MantineTextAreaProps {
  id: string;
  register: UseFormRegister<FieldValues>;
}

const TextArea = ({ id, register, ...otherProps }: TextareaProps) => {
  return (
    <MantineTextArea
      id='description'
      w={'1080px'}
      lh={'25px'}
      radius={'12px'}
      minRows={6}
      className='text-right'
      styles={() => ({
        input: {
          padding: '20px',
          textAlign: 'right',
          border: '1px solid #AAAAAA80',
          ':focus': {
            border: '1px solid #AAAAAAff',
          },
        },
      })}
      {...register(id)}
      {...otherProps}
    />
  );
};

export default TextArea;
