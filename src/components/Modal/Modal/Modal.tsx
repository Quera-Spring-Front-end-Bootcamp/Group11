import { Modal as MantineModal } from '@mantine/core';
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
        centered
        {...otherProps}>
        <MantineModal.Body>{body}</MantineModal.Body>
        {footer}
        <Button
          onClick={action}
          className='w-full'>
          {actionLabel}
        </Button>
      </MantineModal>
    </>
  );
};

export default Modal;
