import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from '@mantine/core';
import { Modal } from '../Modal';
import ShareModalSlice from '../../../redux/slices/ModalSlices/ShareModalSlices/ShareProjectModalSlice';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, TextInput } from '../..';
import { LinkCopy } from '.';

const ShareProjectModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.ShareProjectModal.open);

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      invitationEmail: '',
    },
  });

  const body = (
    <Flex
      direction='column'
      gap='30px'>
      <div className='relative '>
        <TextInput
          type='email'
          id='invitationEmail'
          register={register}
          className='w-full mt-[20px]'
          placeholder='دعوت با ایمیل'
          noBorder
        />
        <Button
          p='10px 30px'
          radius='8px 0 0 8px'
          className='absolute -left-1 bottom-0'>
          ارسال
        </Button>
      </div>
      <LinkCopy link='link' />
      <Text
        fz='14px'
        c='#7D828C
'
        ta='right'>
        اشتراک گذاشته شده با
      </Text>
    </Flex>
  );

  return (
    <Modal
      opened={open}
      onClose={() => dispatch(ShareModalSlice.actions.onClose())}
      title={'title'}
      body={body}
      // footer={footer}
      // actionLabel={actionLabel}
      // action={onSubmit}
    />
  );
};

export default ShareProjectModal;
