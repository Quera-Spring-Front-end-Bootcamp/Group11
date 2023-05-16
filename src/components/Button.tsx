import { Button as MantineButton } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';

const Button = (props: ButtonProps) => {
  return (
    <MantineButton
      classNames={{
        icon: 'pb-4',
      }}
      {...props}
    />
  );
};

export default Button;
