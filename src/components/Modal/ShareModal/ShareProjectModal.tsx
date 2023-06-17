import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ShareProjectModalSlice } from '../../../redux/slices';
import { Modal } from '../Modal';
import { Button, TextInput } from '../..';
import { LinkCopy } from '.';
import { Member, Project, User, workspaceObj } from '../../../util/types';
import {
  getProjectByIdApi,
  shareProjectApi,
} from '../../../services/projectApi';
import MemberRow from './MemberRow';

const ShareProjectModal = () => {
  const [data, setData] = useState<Project>();
  const [loading, setLoading] = useState(false);
  const [URLSearchParams] = useSearchParams();
  const selectedWs = URLSearchParams.get('workspaceId');
  const selectedProject = URLSearchParams.get('projectId');
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.ShareProjectModal.open);
  const currentId = useSelector((state: any) => state.user.id);

  //to fetch data and updated modal state
  const fetchProjectData = async () => {
    const {
      data: { data },
    } = await getProjectByIdApi(selectedProject!);
    setData(data);
  };

  useEffect(() => {
    fetchProjectData();
  }, [selectedProject, selectedWs]);

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
    setLoading(true);
    const { username } = data;
    try {
      await shareProjectApi(selectedProject!, username);

      await fetchProjectData();
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

  const members = data?.members;

  const body = (
    <>
      <Flex
        direction='column'
        gap='30px'
        mb='20px'>
        <div className='relative '>
          <TextInput
            id='username'
            register={register}
            className='w-full mt-[20px]'
            placeholder='دعوت با نام کاربری'
            noBorder
            errors={errors}
          />
          <Button
            p='10px 30px'
            radius='8px 0 0 8px'
            onClick={handleSubmit(onSubmit)}
            loading={loading}
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
      <Flex
        direction='column'
        gap='12px'>
        {members?.map((member: Member) => (
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
        ))}
      </Flex>
    </>
  );

  return (
    <Modal
      opened={open}
      onClose={() => dispatch(ShareProjectModalSlice.actions.onClose())}
      title={'به اشتراک گذاری پروژه'}
      body={body}
      // action={handleSubmit(onSubmit)}
      // actionLabel={actionLabel}
      // footer={footer}
    />
  );
};

export default ShareProjectModal;
