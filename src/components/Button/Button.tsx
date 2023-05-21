import { Button as MantineButton } from '@mantine/core';
import type { ButtonProps as MantineButtonProps } from '@mantine/core';

interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
}

const Button = ({ children, onClick, ...otherProps }: ButtonProps) => {
  return (
    <MantineButton
      onClick={onClick}
      {...otherProps}>
      {children}
    </MantineButton>
  );
};

export default Button;
