import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../Modal';
import ShareProjectModalSlice from '../../../redux/slices/ModalSlices/ShareProjectModalSlice';
import { FieldValues, useForm } from 'react-hook-form';

const ShareProjectModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.ShareProjectModal.open);

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    setValue, //set custom value by ID
    getValues, //get value by id
    watch, //watch value for change
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      workSpaceName: '',
      selectedWorkSpaceColor: '#76BC86',
    },
  });

  const title = 'به اشتراک گذاری پروژه';

  const body = <>body</>;

  return (
    <Modal
      opened={open}
      onClose={() => dispatch(ShareProjectModalSlice.actions.onClose())}
      title={title}
      body={body}
      // footer={footer}
      // actionLabel={actionLabel}
      // action={onSubmit}
    />
  );
};

export default ShareProjectModal;
