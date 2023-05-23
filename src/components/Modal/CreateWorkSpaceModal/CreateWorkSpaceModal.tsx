import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../Modal';
import { onClose } from '../../../redux/slices/ModalSlices/CreateWorkSpaceModalSlice';
import { title } from 'process';
import { useCallback, useMemo, useState } from 'react';
import { TextInput } from '../..';

interface CreateWorkSpaceModalProps {
  children?: React.ReactNode;
  title?: string;
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
}

enum STEPS {
  NAME = 0,
  COLOR = 1,
  OVERVIEW = 2,
}

const CreateWorkSpaceModal = ({ children }: CreateWorkSpaceModalProps) => {
  const [step, setStep] = useState(STEPS.NAME);

  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.CreateWorkSpaceModal.open);

  let title;
  let body;
  let footer;

  if (step === STEPS.NAME) {
    title = 'ساختن ورک‌اسپیس جدید';
    body = (
      <>
        <TextInput label='نام ورک‌اسپیس' />
      </>
    );
  }
  if (step === STEPS.COLOR) {
    title = 'انتخاب رنگ ورک‌اسپیس';
  }
  if (step === STEPS.OVERVIEW) {
    title = 'مرور اطلاعات';
  }

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.OVERVIEW) {
      return 'ساختن ورک‌اسپیس';
    }
    return 'ادامه';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.NAME) {
      return undefined;
    }
    return true;
  }, [step]);

  const onSubmit = () => {
    if (step !== STEPS.OVERVIEW) return onNext();
  };

  return (
    <Modal
      opened={open}
      onClose={() => dispatch(onClose())}
      title={title}
      body={body}
      footer={footer}
      actionLabel={actionLabel}
      action={onSubmit}
      // back={secondaryActionLabel}
    />
  );
};

export default CreateWorkSpaceModal;
