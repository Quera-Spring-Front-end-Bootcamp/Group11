import { Container as MantineContainer } from '@mantine/core';
import { ContainerProps as MantineContainerProps } from '@mantine/core';

const Container = ({ children }: MantineContainerProps) => {
  return (
    <MantineContainer
      size='1440px'
      p={0}>
      {children}
    </MantineContainer>
  );
};

export default Container;
