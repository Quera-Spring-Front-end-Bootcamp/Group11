import { TextInput as MantineTextInput } from '@mantine/core';
import { TextInputProps as MantineTextInputProps } from '@mantine/core';

const TextInput = ({ ...otherProps }: MantineTextInputProps) => {
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
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '21px',
        },
      })}
      radius='6px'
      {...otherProps}
    />
  );
};

export default TextInput;
