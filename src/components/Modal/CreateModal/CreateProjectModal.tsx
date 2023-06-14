import { useDispatch, useSelector } from 'react-redux';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

import { toast } from 'react-hot-toast';
import CreateModal from './CreateModal';
import { onClose } from '../../../redux/slices/ModalSlices/CreateModalSlices/CreateProjectModalSlice';
import { createProjectApi } from '../../../services/projectApi';
import userSlice from '../../../redux/slices/userSlice';

const CreateProjectModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.CreateProjectModal.open);
  const wsId = useSelector((state: any) => state.CreateProjectModal.wsId);
  const prevWorkspacesData = useSelector(
    (state: any) => state.user.allWorkspaces
  );
  const [loading, setLoading] = useState(false);

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    setValue,
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { name } = data;
    setLoading(true);

    try {
      const {
        data: { data: createdProject },
      } = await createProjectApi(name, wsId);

      dispatch(
        userSlice.actions.addCreatedProjectToWorkspace({
          wsId,
          createdProject,
          prevWorkspacesData,
        })
      );

      toast.success('پروژه با موفقیت ایجاد شد');

      dispatch(onClose());
      setValue('projectNameValue', '');
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('ساخت پروژه با خطا مواجه شد،‌لطفا مجددا تلاش فرمایید');
      setLoading(false);
    }
  };

  return (
    <CreateModal
      title='ساختن پروژه جدید'
      open={open}
      onClose={() => dispatch(onClose())}
      inputId='name'
      registerForm={register}
      errorForm={errors}
      submit={handleSubmit(onSubmit)}
      label='نام پروژه'
      loading={loading}
      submitLabel='ساخت پروژه'
    />
  );
};

export default CreateProjectModal;
