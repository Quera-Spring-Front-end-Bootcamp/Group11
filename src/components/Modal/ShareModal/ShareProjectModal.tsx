import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from '@mantine/core';
import { Modal } from '../Modal';
import ShareModalSlice from '../../../redux/slices/ModalSlices/ShareModalSlices/ShareProjectModalSlice';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, TextInput } from '../..';
import { LinkCopy } from '.';
import { Member, Project, User, workspaceObj } from '../../../util/types';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjectByIdApi } from '../../../services/projectApi';
import MemberRow from './MemberRow';

const ShareProjectModal = () => {
  const [data, setData] = useState<Project>();
  const [URLSearchParams] = useSearchParams();
  const selectedWs = URLSearchParams.get('workspaceId');
  const selectedProject = URLSearchParams.get('projectId');
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.ShareProjectModal.open);
  const currentId = useSelector((state: any) => state.user.id);
  // const projectData = useSelector((state: any) => {
  //   const ws = state.user.allWorkspaces.find(
  //     (ws: workspaceObj) => ws._id === selectedWs
  //   );
  //   return ws?.projects.find((proj: Project) => proj._id === selectedProject);
  // });

  useEffect(() => {
    const fetchProjectData = async () => {
      const {
        data: { data },
      } = await getProjectByIdApi(selectedProject!);
      setData(data);
    };

    fetchProjectData();
  }, [selectedProject, selectedWs]);

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      invitationEmail: '',
    },
  });

  const members = data?.members;

  const body = (
    <>
      <Flex
        direction='column'
        gap='30px'
        mb='20px'>
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
      onClose={() => dispatch(ShareModalSlice.actions.onClose())}
      title={'به اشتراک گذاری پروژه'}
      body={body}
      // footer={footer}
      // actionLabel={actionLabel}
      // action={onSubmit}
    />
  );
};

export default ShareProjectModal;
