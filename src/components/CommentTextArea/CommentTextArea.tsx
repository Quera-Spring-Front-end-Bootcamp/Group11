import { Textarea as MantineTextArea } from '@mantine/core';
import { TextareaProps as MantineTextAreaProps } from '@mantine/core';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface CommentTextAreaProps extends MantineTextAreaProps {
  id: string;
  register: UseFormRegister<FieldValues>;
}

const CommentTextArea = ({
  id,
  register,
  ...otherProps
}: CommentTextAreaProps) => {
  return (
    <MantineTextArea
     id={id}
      radius={'12px'}
      styles={() => ({
        input: {
          padding: '13px 0px 0px 0px !important',

          textAlign: 'right',
          border: 'none',
        },
      })}
      {...register(id)}
      {...otherProps}
    />
  );
};

export default CommentTextArea;
