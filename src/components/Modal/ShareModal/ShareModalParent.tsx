import { Flex, Text } from '@mantine/core';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { Modal } from '../Modal';
import { Button, TextInput } from '../..';
import { LinkCopy } from '.';

interface IShareProjectModalProps {
  memberRow: React.ReactNode;
  open: boolean;
  loading: boolean;
  registerForm: UseFormRegister<FieldValues>;
  errorForm: FieldErrors;
  submit: () => void;
  formId: string;
  onClose: () => void;
  title: string;
}

const ShareModalParent = ({
  memberRow,
  open,
  loading,
  registerForm,
  submit,
  formId,
  onClose,
  errorForm,
  title,
}: IShareProjectModalProps) => {
  const body = (
    <>
      <Flex
        direction='column'
        gap='30px'
        mb='20px'>
        <div className='relative '>
          <TextInput
            id={formId}
            register={registerForm}
            className='w-full mt-[20px]'
            placeholder='دعوت با نام کاربری'
            noBorder
            errors={errorForm}
          />
          <Button
            p='0px 30px'
            radius='8px 0 0 8px'
            h='35px'
            onClick={submit}
            loading={loading}
            className='absolute -left-1 bottom-0'>
            ارسال
          </Button>
        </div>
        <LinkCopy link='link' />
        <Text
          fz='14px'
          c='#7D828C'
          ta='right'>
          اشتراک گذاشته شده با
        </Text>
      </Flex>
      <Flex
        direction='column'
        gap='12px'>
        {memberRow}
      </Flex>
    </>
  );

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={title}
      body={body}
    />
  );
};

export default ShareModalParent;
