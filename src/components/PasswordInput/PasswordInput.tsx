import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { PasswordInputProps as MantinePasswordInputProps } from '@mantine/core';

const PasswordInput = ({ ...otherProps }: MantinePasswordInputProps) => {
  return (
    <MantinePasswordInput
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
