import { Flex, Loader } from '@mantine/core';
import { IconType } from 'react-icons';

interface IConfirmationButton {
  onClick?: (e: MouseEvent) => void;
  bg: string;
  icon: IconType;
  loading?: boolean;
  cancelButton?: boolean;
  fullHeight?: boolean;
}
const ConfirmationButton = ({
  onClick,
  bg,
  icon: Icon,
  loading,
  cancelButton,
  fullHeight,
}: IConfirmationButton) => {
  return (
    <Flex
      onClick={onClick as any}
      className='w-1/2 transition justify-center items-center p-2 rounded-6'
      bg={bg}
      sx={{
        height: fullHeight ? '100%' : '22px',
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
          size={20}
        />
      )}
    </Flex>
  );
};

export default ConfirmationButton;
