import { useState } from 'react';
import {
  Flex,
  Menu as MantineMenu,
  MenuProps as MantineMenuProps,
} from '@mantine/core';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { BsLink45Deg, BsTrash3 } from 'react-icons/bs';
import {
  AiOutlineCheck,
  AiOutlinePlus,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import toast from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';

import { Button, ClickOutsideWrapper, TextInput } from '..';
import { ConfirmationButton } from './Components';
import {
  ProjectSlice,
  ShareProjectModalSlice,
  userSlice,
} from '../../redux/slices/';

import { storeStateTypes } from '../../util/types';
import { deleteProjectApi, updateProjectApi } from '../../services/projectApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

interface MenuProps extends MantineMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  wsId: string;
}
export const ProjectMenu = ({ open, setOpen, projectId, wsId }: MenuProps) => {
  const [editingName, setEditingName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [URLSearchParams] = useSearchParams();
  const prevWorkspacesData = useSelector(
    (state: storeStateTypes) => state.user.allWorkspaces
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [URLSearchParams] = useSearchParams();
  const projectIdInUrl = URLSearchParams.get('projectId');

  const onCreateClickHandler = () => {
    //create task logic here
  };

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

  const onSubmitNewName: SubmitHandler<FieldValues> = async (data) => {
    const { name } = data;
    setLoading(true);

    try {
      const {
        data: { data: updatedProject },
      } = await updateProjectApi(projectId, {
        name,
      });

      dispatch(
        userSlice.actions.updateProjectName({
          prevWorkspacesData,
          projectId,
          wsId,
          updatedProject,
        })
      );
      if (URLSearchParams.get('projectId') === projectId) {
        dispatch(ProjectSlice.actions.setProjectName(name));
      }

      toast.success('نام پروژه با موفقیت تغییر یافت');

      setValue('name', '');
      setLoading(false);
      setEditingName(false);
    } catch (error) {
      console.log(error);
      toast.error('تغییر نام پروژه با خطا مواجه شد،‌لطفا مجددا تلاش فرمایید');
      setLoading(false);
    }
  };

  const onShareClickHandler = () => {
    dispatch(ShareProjectModalSlice.actions.onOpen());
    dispatch(ShareProjectModalSlice.actions.setProject({ projectId }));
    setOpen(false);
  };

  const onDeleteClickHandler = async (e: MouseEvent) => {
    e.stopPropagation();
    setDeleteLoading(true);

    try {
      await deleteProjectApi(projectId);

      dispatch(
        userSlice.actions.deleteProjectFromWorkspace({
          wsId,
          projectId,
          prevWorkspacesData,
        })
      );

      toast.success('پروژه مورد نظر با موفقیت حذف گردید');
      {
        projectId === projectIdInUrl && navigate('/board');
      }
      setOpen(false);
      setDeleteLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('عملیات با مشکل مواجه شد، لطفا مجددا تلاش فرمایید');
      setDeleteLoading(false);
    }
  };

  const onCancelDeleteHandler = (e: MouseEvent) => {
    e.stopPropagation();
    setDeleting(false);
    setValue('name', '');
  };

  return (
    <ClickOutsideWrapper
      onOutsideClick={() => {
        setOpen(false);
      }}>
      <MantineMenu
        shadow='sm'
        opened={open}
        styles={{
          dropdown: {
            padding: '14px !important',
            maxWidth: '220px',
            minWidth: '220px',
          },
          item: {
            padding: 4,
            textAlign: 'right',
            margin: '10px 0',
            fontSize: '14px',
          },
          itemIcon: {
            padding: 0,
            margin: '0 0 0 10px',
          },
        }}>
        <MantineMenu.Dropdown>
          <MantineMenu.Item
            onClick={onCreateClickHandler}
            icon={<AiOutlinePlus size={22} />}>
            ساختن تسک جدید
          </MantineMenu.Item>
          <MantineMenu.Item
            onClick={() => {
              setEditingName(true);
            }}
            icon={!editingName && <FiEdit size={22} />}>
            {editingName ? (
              <Flex
                mah={'22px'}
                gap='2px'
                direction={'row'}
                align={'center'}
                pos='relative'>
                <div className='absolute -right-1 w-1/6 h-[30px]'>
                  <ConfirmationButton
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      setEditingName(false);
                    }}
                    bg='transparent'
                    fullHeight
                    icon={RxCross2}
                  />
                </div>
                <form onSubmit={handleSubmit(onSubmitNewName)}>
                  <TextInput
                    id='name'
                    register={register}
                    errors={errors}
                    required
                    sx={{ paddingRight: '25px' }}
                  />
                </form>
                <div className='w-1/4 h-[25px]'>
                  <ConfirmationButton
                    onClick={handleSubmit(onSubmitNewName) as any}
                    bg='green'
                    fullHeight
                    icon={AiOutlineCheck}
                    loading={loading}
                  />
                </div>
              </Flex>
            ) : (
              ' ویرایش نام پروژه'
            )}
          </MantineMenu.Item>
          <MantineMenu.Item icon={<BsLink45Deg size={22} />}>
            کپی لینک
          </MantineMenu.Item>
          <MantineMenu.Item
            onClick={() => setDeleting(true)}
            c='red'
            icon={<BsTrash3 size={22} />}>
            {deleting ? (
              <Flex gap='5px'>
                <ConfirmationButton
                  bg='red'
                  icon={AiOutlineCheck}
                  onClick={!deleteLoading ? onDeleteClickHandler : undefined}
                  loading={deleteLoading}
                  cancelButton={false}
                />
                <ConfirmationButton
                  onClick={!deleteLoading ? onCancelDeleteHandler : undefined}
                  bg='#00000060'
                  icon={RxCross2}
                  cancelButton
                />
              </Flex>
            ) : (
              'حذف'
            )}
          </MantineMenu.Item>
          <Button
            icon={AiOutlineShareAlt}
            className='w-full'
            onClick={onShareClickHandler}>
            اشتراک گذاری
          </Button>
        </MantineMenu.Dropdown>
      </MantineMenu>
    </ClickOutsideWrapper>
  );
};
