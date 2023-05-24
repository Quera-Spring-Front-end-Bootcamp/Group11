import { Button } from '@mantine/core';
import { TbLogout } from 'react-icons/tb';

const LogOutButton = () => {
  return (
    <Button
      styles={() => ({
        root: {
          border: '0',
          margin: '0',
          padding: '0',
          width: 'fit-content',
          color: '#818181',
          backgroundColor: 'transparent',
          '&:hover': {
            color: 'red',
            backgroundColor: 'transparent',
          },
        },
        label: {
          fontSize: '{16px}',
          lineHeight: '{24px}',
        },
        leftIcon: {
          padding: '4px',
          marginRight: '0',
          marginLeft: '4px',
        },
      })}
      leftIcon={<TbLogout size={'1.5rem'} />}>
      خروج
    </Button>
  );
};

export default LogOutButton;
