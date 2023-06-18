import { identity } from '@fullcalendar/core/internal';
import { TextInput as MantineTextInput } from '@mantine/core';
import { TextInputProps as MantineTextInputProps } from '@mantine/core';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Ri4KLine } from 'react-icons/ri';

type inputProps = Omit<MantineTextInputProps, 'pattern'> & {
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  pattern?: RegExp;
  errors?: FieldErrors;
  noBorder?: boolean;
};

const TextInput = ({
  id,
  required,
  register,
  errors,
  noBorder,
  pattern,
  ...otherProps
}: inputProps) => {
  let haveError: boolean;
  if (errors) {
    if (Object.keys(errors).length) {
      haveError = true;
    }
  }

  return (
    <MantineTextInput
      styles={() => ({
        input: {
          border: haveError
            ? '2px solid red'
            : noBorder
            ? 'none'
            : '1px solid #AAAAAA80',
          backgroundColor: noBorder ? '#F0F1F3' : '',
          textAlign: 'right',
          ':focus': {
            border: haveError ? '2px solid red' : '1px solid #AAAAAAff',
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
      {...register(id, { required, pattern })}
      {...otherProps}
      icon={Ri4KLine}
    />
  );
};

export default TextInput;
