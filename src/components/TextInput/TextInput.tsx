import { TextInput as MantineTextInput } from '@mantine/core';
import { TextInputProps as MantineTextInputProps } from '@mantine/core';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface inputProps extends MantineTextInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors?: FieldErrors;
}

const TextInput = ({
  id,
  required,
  register,
  errors,
  ...otherProps
}: inputProps) => {
  return (
    <MantineTextInput
      styles={() => ({
        input: {
          border: '1px solid #AAAAAA',
          textAlign: 'right',
          ':focus': {
            border: '2px solid gray',
          },
          height: '40px',
        },
        label: {
          width: '100%',
          textAlign: 'right',
          marginBottom: '8px',
          fontSize: '14px',
          lineHeight: '21px',
        },
      })}
      radius='6px'
      {...register(id, { required })}
      {...otherProps}
    />
  );
};

export default TextInput;
