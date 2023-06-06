import { Button as MantineButton } from '@mantine/core';
import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import { IconType } from 'react-icons';

interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
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
      bg={'#208D8E'}
      fz={'14px'}
      fw={'700'}
      lh={'22px'}
      styles={{
        root: {
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
