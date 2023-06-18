import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ShareWorkspaceModalSlice } from '../../../redux/slices';
import { ShareModalParent } from '.';
import { User, workspaceObj } from '../../../util/types';
import MemberRow from './MemberRow';
import {
  addMemberToWorkspaceApi,
  getWorkspacesByIdApi,
} from '../../../services/workspaceApi';

const ShareWorkspaceModal = () => {
  const [data, setData] = useState<workspaceObj>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.ShareWorkspaceModal.open);
  const selectedWs = useSelector(
    (state: any) => state.ShareWorkspaceModal.wsId
  );
  const currentId = useSelector((state: any) => state.user.id);

  //to fetch data and updated modal state
  const fetchWorkspaceData = async () => {
    const {
      data: { data },
    } = await getWorkspacesByIdApi(selectedWs!);
    setData(data);
  };

  useEffect(() => {
    fetchWorkspaceData();
  }, [selectedWs]);

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

  // submit form value
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const { username } = data;
    try {
      await addMemberToWorkspaceApi(username, selectedWs);
      await fetchWorkspaceData();
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

  let members: Array<{ user: User }> = [];

  if (data?.members) {
    members = [{ user: data.user! }, ...data.members];
  }

  const memberRow = members.map((member: { user: User }, i) => (
    <MemberRow
      key={member.user._id}
      username={member.user.username}
      email={member.user.email}
      currentUserId={currentId}
      role={i === 0 ? 'owner' : 'member'}
      userId={member.user._id}
    />
  ));

  return (
    <ShareModalParent
      memberRow={memberRow}
      open={open}
      onClose={() => dispatch(ShareWorkspaceModalSlice.actions.onClose())}
      registerForm={register}
      formId='username'
      errorForm={errors}
      loading={loading}
      submit={handleSubmit(onSubmit)}
    />
  );
};

export default ShareWorkspaceModal;
