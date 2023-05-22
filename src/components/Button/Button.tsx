import { Button as MantineButton } from '@mantine/core';
import type { ButtonProps as MantineButtonProps } from '@mantine/core';

interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
}

const Button = ({ children, onClick, ...otherProps }: ButtonProps) => {
  return (
    <MantineButton
      h={'40px'}
      radius={'6px'}
      p={'10px'}
      c={'white'}
      bg={'#208D8E'}
      fs={'14px'}
      fw={'700'}
      lh={'22px'}
      sx={{
        '&:hover': {
          backgroundColor: '#277576',
        },
      }}
      onClick={onClick}
      {...otherProps}>
      {children}
    </MantineButton>
  );
};

export default Button;
