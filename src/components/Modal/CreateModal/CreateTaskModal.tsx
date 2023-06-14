import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../Modal';
import { onClose } from '../../../redux/slices/ModalSlices/CreateModalSlices/CreateWorkSpaceModalSlice';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { TextInput, ColorInput } from '../..';
import { workSpaceColors } from '../../../constants';
import { RxValueNone } from 'react-icons/rx';
import { AiOutlineCheck } from 'react-icons/ai';
import { Avatar } from '@mantine/core';
import { createWorkSpaceApi } from '../../../services/workspaceApi';
import { toast } from 'react-hot-toast';

interface CreateWorkSpaceModalProps {
  children?: React.ReactNode;
  title?: string;
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
}

const CreateWorkSpaceModal = ({}: CreateWorkSpaceModalProps) => {
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.createModal.open);
  const [loading, setLoading] = useState(false);

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      createInputValue: '',
    },
  });

  let title;
  let body;
  let footer;

  title = 'ساختن ورک‌اسپیس جدید';
  body = (
    <>
      <TextInput
        required
        errors={errors}
        pattern={/^.{4,}$/}
        id='createInputValue'
        register={register}
        label='نام ورک‌اسپیس'
      />
    </>
  );

  return (
    <Modal
      opened={open}
      onClose={() => dispatch(onClose())}
      title={title}
      body={body}
      footer={footer}
      actionLabel={actionLabel}
      action={handleSubmit(onSubmit)}
      loading={loading}
    />
  );
};

export default CreateWorkSpaceModal;
