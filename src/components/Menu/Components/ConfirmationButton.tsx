import { Flex, Loader } from '@mantine/core';
import { IconType } from 'react-icons';

interface IConfirmationButton {
  onClick?: (e: MouseEvent) => void;
  bg: string;
  icon: IconType;
  loading?: boolean;
  cancelButton?: boolean;
  fullHeight?: boolean;
  padding?: '0px' | '2px';
}
const ConfirmationButton = ({
  onClick,
  bg,
  icon: Icon,
  loading,
  cancelButton,
  padding = '2px',
}: IConfirmationButton) => {
  return (
    <Flex
      onClick={onClick as any}
      className=' transition justify-center items-center rounded-6 w-full'
      bg={bg}
      sx={{
        padding,
        height: '100%',
        '&:hover': {
          backgroundColor: bg,
        },
      }}>
      {!cancelButton && loading ? (
        <Loader
          color='dark'
          size='xs'
        />
      ) : (
        <Icon
          color='#00000080'
          size={15}
        />
      )}
    </Flex>
  );
};

export default ConfirmationButton;
