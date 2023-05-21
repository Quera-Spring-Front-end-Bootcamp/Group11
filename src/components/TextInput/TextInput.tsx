import { TextInput as MantineTextInput } from '@mantine/core';
import { TextInputProps as MantineTextInputProps } from '@mantine/core';

const TextInput = ({ ...otherProps }: MantineTextInputProps) => {
  return (
    <MantineTextInput
      styles={() => ({
        input: {
          textAlign: 'right',
          ':focus': {
            borderColor: '#AE9F9F',
          },
          height: '40px',
        },
        label: {
          width: '100%',
          textAlign: 'right',
          marginBottom: '8px',
        },
      })}
      radius='6px'
      {...otherProps}
    />
  );
};

export default TextInput;
