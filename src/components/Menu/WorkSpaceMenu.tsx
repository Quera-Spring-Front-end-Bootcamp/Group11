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
import { ChangeColorModal } from '../Modal';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface MenuProps extends MantineMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wsId: string;
  wsColor: string;
}
export const WorkSpaceMenu = ({ open, setOpen, wsId, wsColor }: MenuProps) => {
  const [editingName, setEditingName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeColorLoading, setChangeColorLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [colorChangeOpen, setColorChangeOpen] = useState(false);
  const prevWorkspacesData = useSelector(
    (state: storeStateTypes) => state.user.allWorkspaces
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [URLSearchParams] = useSearchParams();
  const workspaceIdInUrl = URLSearchParams.get('workspaceId');

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
      color: '',
    },
  });

  const onSubmitNewName: SubmitHandler<FieldValues> = async (data) => {
    const { name } = data;
    setLoading(true);

    try {
      const {
        data: { data: updatedWorkspace },
      } = await updateWorkspaceApi(wsId, {
        name,
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
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('مشکلی پیش آمده است، لطفا مجددا تلاش فرمایید');
      setLoading(false);
    }
  };

  const onSubmitNewColor: SubmitHandler<FieldValues> = async (data) => {
    const { color } = data;
    setChangeColorLoading(true);

    try {
      console.log(color);
      // const {
      //   data: { data: updatedWorkspace },
      // } = await updateWorkspaceApi(wsId, {
      //   color,
      // });

      // dispatch(
      //   userSlice.actions.updateWorkspaceColor({
      //     wsId,
      //     updatedWorkspace,
      //     prevWorkspacesData,
      //   })
      // );

      toast.success('رنگ ورک‌اسپیس با موفقیت تغییر یافت');
      setOpen(false);
      setChangeColorLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('مشکلی پیش آمده است، لطفا مجددا تلاش فرمایید');
      setChangeColorLoading(false);
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
      {
        wsId === workspaceIdInUrl && navigate('/board');
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
        if (colorChangeOpen) return;
        setOpen(false);
      }}>
      <ChangeColorModal
        open={colorChangeOpen}
        setOpen={setColorChangeOpen}
        setColor={setValue}
        loading={changeColorLoading}
        submit={handleSubmit(onSubmitNewColor)}
        selectedWorkSpaceColor={wsColor}
      />
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
                    loading={loading}
                  />
                </div>
              </Flex>
            ) : (
              ' ویرایش نام ورک‌اسپیس'
            )}
          </MantineMenu.Item>
          <MantineMenu.Item
            onClick={() => setColorChangeOpen(true)}
            icon={<IoColorPaletteOutline size={22} />}>
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
