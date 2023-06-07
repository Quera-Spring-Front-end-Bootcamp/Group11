import { TextInput as MantineTextInput } from '@mantine/core';
import { TextInputProps as MantineTextInputProps } from '@mantine/core';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface inputProps extends MantineTextInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors?: FieldErrors;
  noBorder?: boolean;
}

const TextInput = ({
  id,
  required,
  register,
  errors,
  noBorder,
  ...otherProps
}: inputProps) => {
  return (
    <MantineTextInput
      styles={() => ({
        input: {
          border: noBorder ? 'none' : '1px solid #AAAAAA80',
          backgroundColor: noBorder ? '#F0F1F3' : '',
          textAlign: 'right',
          ':focus': {
            border: '1px solid #AAAAAAff',
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
