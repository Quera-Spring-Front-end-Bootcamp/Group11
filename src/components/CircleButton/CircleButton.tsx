import { ReactNode, forwardRef } from 'react';
import { UnstyledButton as MantineButton } from '@mantine/core';
interface CircleButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  // height: string;
  // width: string;
  // padding: string;
  borderColor: string | null | undefined;
  children: ReactNode;
}

const CircleButton = forwardRef<HTMLButtonElement, CircleButtonProps>(
  (
    {
      // height,
      // width,
      // padding,
      borderColor,
      children,
      ...otherProps
    }: CircleButtonProps,
    ref
  ) => (
    <MantineButton
      ref={ref}
      variant='outline'
      h={'50px'}
      w={'50px'}
      p={'10px'}
      c={'#C1C1C1'}
      sx={() => ({
        ':hover': { backgroundColor: '#ECFDF5' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        border: '2px dashed',
        borderColor: borderColor ? borderColor : '#C1C1C1',
      })}
      {...otherProps}>
      {children}
    </MantineButton>
  )
);

export default CircleButton;
