import { Modal as MantineModal } from '@mantine/core';
import { ModalProps as MantineModalProps } from '@mantine/core';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { Button } from '../..';

interface ModalProps extends MantineModalProps {
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  action?: () => void;
  back?: boolean;
  backAction: () => void;
}

const Modal = ({
  body,
  footer,
  action,
  actionLabel,
  back,
  backAction,
  title,
  ...otherProps
}: ModalProps) => {
  return (
    <>
      <MantineModal
        radius='md'
        styles={() => ({
          root: {
            position: 'relative',
          },
          content: {
            padding: '0px 16px 12px 16px',
          },
          body: {
            paddingTop: 0,
          },
          title: {
            textAlign: 'center',
            width: '100%',
            fontSize: '24px',
            fontWeight: 'bold',
          },
          header: {
            padding: '24px 0',
          },
        })}
        centered
        withCloseButton={false}
        {...otherProps}>
        {/*Header Section*/}
        <MantineModal.Header>
          {/* back button if it is a multi step modal */}
          {back && (
            <div
              className='absolute left-0 text-[#848e96] text-xl cursor-pointer'
              onClick={backAction}>
              <MdOutlineKeyboardBackspace />
            </div>
          )}

          {/* title and close button */}
          <MantineModal.Title>{title}</MantineModal.Title>
          <MantineModal.CloseButton />
        </MantineModal.Header>

        {/*body Section*/}
        <MantineModal.Body
          mt='1rem'
          mb='3rem'
          p='0'>
          {body}
        </MantineModal.Body>

        {/*footer section if included */}
        <div>{footer}</div>
        
        {/* action button if included */}
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
