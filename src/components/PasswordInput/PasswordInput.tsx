import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { PasswordInputProps as MantinePasswordInputProps } from '@mantine/core';

const PasswordInput = ({ ...otherProps }: MantinePasswordInputProps) => {
  return (
    <MantinePasswordInput
      styles={() => ({
        input: {
          textAlign: 'right',
          width: '100%',
        },
        innerInput: {
          textAlign: 'right',
          width: '100%',
          paddingLeft: 'calc(2.25rem / 3)',
          paddingRight: 'calc(2.25rem / 3)',
        },
        label: {
          width: '100%',
          textAlign: 'right',
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
