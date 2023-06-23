import { Button as MantineButton } from '@mantine/core';
import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import { IconType } from 'react-icons';

interface ButtonProps extends MantineButtonProps {
  onClick?: (e: MouseEvent | any) => void;
  icon?: IconType;
}

const Button = ({
  children,
  onClick,
  icon: Icon,
  ...otherProps
}: ButtonProps) => {
  return (
    <MantineButton
      h={'40px'}
      radius={'6px'}
      p={'10px'}
      c={'white'}
      fz={'14px'}
      fw={'700'}
      lh={'22px'}
      styles={{
        root: {
          backgroundColor: '#208D8E',
          '&:hover': {
            backgroundColor: '#277576',
          },
        },
        inner: {
          gap: '0.5rem',
        },
      }}
      leftIcon={Icon && <Icon size={18} />}
      onClick={onClick}
      {...otherProps}>
      {children}
    </MantineButton>
  );
};

export default Button;
