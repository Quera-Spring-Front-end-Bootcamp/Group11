import { Checkbox as MantineCheckbox } from '@mantine/core';
import type { CheckboxProps as MantineCheckboxProps } from '@mantine/core';

interface CheckboxProps extends MantineCheckboxProps {
  onClick?: () => void;
}

const Checkbox = ({ onClick, ...otherProps }: CheckboxProps) => {
  return (
    <MantineCheckbox
      //@ts-ignore
      styles={() => ({
        input: {
          height: '20px',
          width: '20px',
          borderRadius: '4px',
          border: '1px solid #999999',
          cursor: 'pointer',
        },
        label: {
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '24px',
          marginRight: '8px',
        },
      })}
      color='cyan'
      onClick={onClick}
      {...otherProps}
    />
  );
};

export default Checkbox;
