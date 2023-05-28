import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { PasswordInputProps as MantinePasswordInputProps } from '@mantine/core';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface PasswordInputProps extends MantinePasswordInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors?: FieldErrors;
}

const PasswordInput = ({
  id,
  register,
  required,
  errors,
  ...otherProps
}: PasswordInputProps) => {
  return (
    <MantinePasswordInput
      id={id}
      {...register(id, { required })}
      styles={() => ({
        input: {
          border: '1px solid #AAAAAA',
          textAlign: 'right',
          width: '100%',
          height: '40px',
          ':focus-within': {
            border: '2px solid gray',
          },
        },

        innerInput: {
          textAlign: 'right',
          width: '100%',
          paddingLeft: 'calc(2.25rem / 3)',
          paddingRight: 'calc(2.25rem / 3)',
          marginTop: 0,
          height: 'auto',
        },
        label: {
          width: '100%',
          textAlign: 'right',
          marginBottom: '8px',
          fontWeight: 'bold',
          fontSize: '14px',
          lineHeight: '21px',
        },
        visibilityToggle: {
          display: 'none',
        },
      })}
      radius='6px'
      {...otherProps}
    />
  );
};

export default PasswordInput;
