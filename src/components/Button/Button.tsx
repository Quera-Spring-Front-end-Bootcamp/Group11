import { Button as MantineButton } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';

const Button = ({ children, ...otherProps }: ButtonProps) => {
  return <MantineButton {...otherProps}>{children}</MantineButton>;
};

export default Button;
