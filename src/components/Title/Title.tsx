import { Title as MantineTitle } from '@mantine/core';
import type { TitleProps as MantineTitleProps } from '@mantine/core';

const Title = ({ children, ...otherProps }: MantineTitleProps) => {
  return (
    <MantineTitle
      fw={'600'}
      fs={'32px'}
      lh={'50px'}
      {...otherProps}>
      {children}
    </MantineTitle>
  );
};

export default Title;
