import { Checkbox as MantineCheckbox } from '@mantine/core';
import type { CheckboxProps as MantineCheckboxProps } from '@mantine/core';

interface CheckboxProps extends MantineCheckboxProps {
  onClick?: () => void;
}

const Checkbox = ({ onClick, ...otherProps }: CheckboxProps) => {
  return (
    <MantineCheckbox
      styles={() => ({
        label: {
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '24px',
        },
      })}
      color='cyan'
      onClick={onClick}
      {...otherProps}
    />
  );
};

export default Checkbox;
