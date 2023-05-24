import { Button as MantineButton } from '@mantine/core';
import type { ButtonProps as MantineButtonProps } from '@mantine/core';

interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
}
const logOutIcon = (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M6 3H18C19.105 3 20 3.895 20 5V19C20 20.105 19.105 21 18 21H6C4.895 21 4 20.105 4 19V5C4 3.895 4.895 3 6 3Z'
      stroke='#818181'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M9 11V13'
      stroke='#818181'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M4 5.00277V18.9978C4 20.4848 5.565 21.4518 6.894 20.7868L10.894 18.7868C11.572 18.4468 12 17.7548 12 16.9968V7.00277C12 6.24477 11.572 5.55277 10.894 5.21377L6.894 3.21377C5.565 2.54877 4 3.51577 4 5.00277Z'
      stroke='#818181'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);

const LogOutButton = () => {
  return (
    <MantineButton
      styles={() => {
        ({
          leftIcon: {
            margin: '0',
          },
        });
      }}
      sx={{
        margin: '0',
        padding: '0',
        width: 'fit-content',
        color: '#818181',
        backgroundColor: 'transparent',
        fontWeight: '{400}',
        fontSize: '{16px}',
        lineHeight: '{24px}',
        '&:hover': {
          border: '2px solid red',
          color: 'red',
          backgroundColor: 'transparent',
        },
      }}
      leftIcon={logOutIcon}>
      خروج
    </MantineButton>
  );
};

export default LogOutButton;
