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
          fontSize: '2rem',
        },
      })}
      color='gray'
      onClick={onClick}
      {...otherProps}
    />
  );
};

export default Checkbox;
