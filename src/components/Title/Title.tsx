import {
    DefaultMantineColor,
    MantineGradient,
    Title as MantineTitle,
  } from '@mantine/core';
  import { TitleSize } from '@mantine/core/lib/Title/Title';
  import { ReactNode } from 'react';
  
  type TitleProps = {
    align:
      | 'left'
      | 'right'
      | '-moz-initial'
      | 'inherit'
      | 'initial'
      | 'revert'
      | 'unset'
      | 'center'
      | 'end'
      | 'start'
      | 'justify'
      | 'match-parent';
    color: DefaultMantineColor | 'dimmed';
    gradient: MantineGradient;
    size: TitleSize;
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    children: ReactNode;
  };
  
  const Title = ({
    align,
    color,
    gradient,
    size,
    weight,
    children,
  }: TitleProps) => {
    return (
      <MantineTitle
        align={align}
        color={color}
        gradient={gradient}
        size={size}
        weight={weight}>
        {children}
      </MantineTitle>
    );
  };
  
  export default Title;