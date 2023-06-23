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
import { IoColorPaletteOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

import { Button, ClickOutsideWrapper, TextInput } from '..';
import { ConfirmationButton } from './Components';
import { userSlice } from '../../redux/slices/';
import {
  CreateProjectModalSlice,
  ShareWorkspaceModalSlice,
} from '../../redux/slices';

import {
  deleteWorkspaceApi,
  updateWorkspaceApi,
} from '../../services/workspaceApi';
import { storeStateTypes } from '../../util/types';

interface MenuProps extends MantineMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wsId: string;
}
export const WorkSpaceMenu = ({ open, setOpen, wsId }: MenuProps) => {
  const [editingName, setEditingName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const currentUserId = useSelector((state: storeStateTypes) => state.user.id);
  const prevWorkspacesData = useSelector(
    (state: storeStateTypes) => state.user.allWorkspaces
  );

  const dispatch = useDispatch();

  const onCreateClickHandler = () => {
    dispatch(CreateProjectModalSlice.actions.onOpen());
    dispatch(CreateProjectModalSlice.actions.setWorkSpaceId({ wsId }));
    setOpen(false);
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
        data: { data: updatedWorkspace },
      } = await updateWorkspaceApi(wsId, {
        image: 'url',
        name,
        usernameOrId: currentUserId,
      });

      dispatch(
        userSlice.actions.updateWorkspaceName({
          wsId,
          updatedWorkspace,
          prevWorkspacesData,
        })
      );

      toast.success('نام ورک‌اسپیس با موفقیت تغییر یافت');

      setValue('name', '');
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('ساخت پروژه با خطا مواجه شد،‌لطفا مجددا تلاش فرمایید');
      setLoading(false);
    }
  };

  const onShareClickHandler = () => {
    dispatch(ShareWorkspaceModalSlice.actions.onOpen());
    dispatch(ShareWorkspaceModalSlice.actions.setWs({ wsId }));
    setOpen(false);
  };

  const onDeleteClickHandler = async (e: MouseEvent) => {
    e.stopPropagation();
    setDeleteLoading(true);

    try {
      await deleteWorkspaceApi(wsId);

      dispatch(userSlice.actions.deleteWorkspace({ wsId, prevWorkspacesData }));
      toast.success('ورک اسپیس مورد نظر با موفقیت حذف گردید');
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
            ساختن پروژه جدید
          </MantineMenu.Item>
          <MantineMenu.Item
            onClick={() => {
              setEditingName(true);
            }}
            icon={!editingName && <FiEdit size={22} />}>
            {editingName ? (
              <Flex
                // maw={'168.5px'}
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
                <TextInput
                  id='name'
                  register={register}
                  errors={errors}
                  required
                  sx={{ paddingRight: '25px' }}
                />
                <div className='w-1/4 h-[25px]'>
                  <ConfirmationButton
                    onClick={handleSubmit(onSubmitNewName) as any}
                    bg='green'
                    fullHeight
                    icon={AiOutlineCheck}
                  />
                </div>
              </Flex>
            ) : (
              ' ویرایش نام ورک‌اسپیس'
            )}
          </MantineMenu.Item>
          <MantineMenu.Item icon={<IoColorPaletteOutline size={22} />}>
            ویرایش رنگ
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
