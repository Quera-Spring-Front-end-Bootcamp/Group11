import { Modal } from '../Modal';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { TextInput } from '../..';

interface CreateModalProps {
  title: string;
  footer?: React.ReactElement;
  label: string;
  inputId: string;
  registerForm: UseFormRegister<FieldValues>;
  errorForm: FieldErrors;
  submit: () => void;
  submitLabel: string;
  loading: boolean;
  open: boolean;
  onClose: () => void;
}

const CreateModal = ({
  title,
  inputId,
  footer,
  label,
  registerForm,
  errorForm,
  submit,
  submitLabel,
  loading,
  onClose,
  open,
}: CreateModalProps) => {
  const body = (
    <>
      <TextInput
        required
        errors={errorForm}
        pattern={/^.{4,}$/}
        id={inputId}
        register={registerForm}
        label={label}
      />
    </>
  );

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={title}
      body={body}
      footer={footer}
      actionLabel={submitLabel}
      action={submit}
      loading={loading}
    />
  );
};

export default CreateModal;
