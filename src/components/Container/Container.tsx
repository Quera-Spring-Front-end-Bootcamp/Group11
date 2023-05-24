import { Container as MantineContainer } from '@mantine/core';
import { ContainerProps as MantineContainerProps } from '@mantine/core';

const Container = ({ children }: MantineContainerProps) => {
  return <MantineContainer size='1440px'>{children}</MantineContainer>;
};

export default Container;
