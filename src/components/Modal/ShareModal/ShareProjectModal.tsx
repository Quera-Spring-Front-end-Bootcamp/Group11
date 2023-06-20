import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ShareProjectModalSlice } from '../../../redux/slices';
import { ShareModalParent } from '.';
import { Member, Project, storeStateTypes } from '../../../util/types';
import {
  getProjectByIdApi,
  shareProjectApi,
} from '../../../services/projectApi';
import MemberRow from './MemberRow';

const ShareProjectModal = () => {
  const [data, setData] = useState<Project>();
  const [loading, setLoading] = useState(false);
  const selectedProject = useSelector(
    (state: storeStateTypes) => state.ShareProjectModal.projectId
  );
  const dispatch = useDispatch();
  const open = useSelector(
    (state: storeStateTypes) => state.ShareProjectModal.open
  );
  const currentId = useSelector((state: storeStateTypes) => state.user.id);

  //to fetch data and updated modal state
  const fetchProjectData = async (projectId: string) => {
    const {
      data: { data },
    } = await getProjectByIdApi(projectId);
    setData(data);
  };

  useEffect(() => {
    fetchProjectData(selectedProject);
  }, [selectedProject]);

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    formState: { errors }, //error for form validation
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
    },
  });

  //submit form value
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!selectedProject) return;

    setLoading(true);
    const { username } = data;

    try {
      await shareProjectApi(selectedProject, username);
      await fetchProjectData(selectedProject);

      setValue('username', '');
      toast.success('کاربر مورد نظر با موفقیت به پروژه اضافه شد');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.response.status === 404)
        return toast.error('کاربر مورد نظر یافت نشد');
      toast.error('مشکلی پیش آمده است، لطفا مجددا تلاش فرمایید');
    }
  };

  const membersRow = data?.members?.map((member: Member) => (
    <MemberRow
      key={member.user._id}
      currentUserId={currentId}
      email={member.user.email}
      firstname={member.user.firstname}
      lastname={member.user.lastname}
      role={member.role}
      userId={member.user._id}
      username={member.user.username}
    />
  ));

  return (
    <ShareModalParent
      memberRow={membersRow}
      open={open}
      onClose={() => dispatch(ShareProjectModalSlice.actions.onClose())}
      registerForm={register}
      formId='username'
      errorForm={errors}
      loading={loading}
      submit={handleSubmit(onSubmit)}
    />
  );
};

export default ShareProjectModal;
