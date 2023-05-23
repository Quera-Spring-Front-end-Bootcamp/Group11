import { Center, Modal as MantineModal } from '@mantine/core';
import { ModalProps as MantineModalProps } from '@mantine/core';
import { Button } from '../..';

interface ModalProps extends MantineModalProps {
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  action?: () => void;
}

const Modal = ({
  body,
  footer,
  action,
  actionLabel,
  ...otherProps
}: ModalProps) => {
  return (
    <>
      <MantineModal
        radius='md'
        styles={() => ({
          content: {
            padding: '12px 16px',
          },
          title: {
            textAlign: 'center',
            width: '100%',
            fontSize: '24px',
            fontWeight: 'bold',
          },
        })}
        centered
        {...otherProps}>
        <MantineModal.Body
          mt='1rem'
          mb='3rem'
          p='0'>
          {body}
        </MantineModal.Body>
        <div>{footer}</div>

        {action && (
          <Button
            onClick={action}
            className='w-full'>
            {actionLabel}
          </Button>
        )}
      </MantineModal>
    </>
  );
};

export default Modal;
