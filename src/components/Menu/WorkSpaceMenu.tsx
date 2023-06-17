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
import { FiEdit } from 'react-icons/fi';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

import { Button, ClickOutsideWrapper, TextInput } from '..';
import {
  CreateProjectModalSlice,
  ShareWorkspaceModalSlice,
} from '../../redux/slices';

import toast from 'react-hot-toast';
import { updateWorkspaceApi } from '../../services/workspaceApi';
import userSlice from '../../redux/slices/UserSlice/UserSlice';

interface MenuProps extends MantineMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wsId: string;
}
export const WorkSpaceMenu = ({ open, setOpen, wsId }: MenuProps) => {
  const [editingName, setEditingName] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUserId = useSelector((state: any) => state.user.username);
  const prevWorkspacesData = useSelector(
    (state: any) => state.user.allWorkspaces
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
  };

  return (
    <ClickOutsideWrapper
      onOutsideClick={() => {
        setOpen(false);
      }}>
      <MantineMenu
        shadow='sm'
        opened={open}
        // onChange={setOpen}
        styles={{
          dropdown: {
            padding: '14px !important',
            maxWidth: '240px',
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
              setOpen(true);
            }}
            icon={!editingName && <FiEdit size={22} />}>
            {editingName ? (
              <Flex
                gap='2px'
                direction={'row'}>
                <TextInput
                  // h='20px'
                  id='name'
                  register={register}
                />
                <Button
                  onClick={handleSubmit(onSubmitNewName)}
                  p={0}
                  loading={loading}
                  icon={AiOutlineCheck}
                />
                <Button
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    setEditingName(false);
                  }}
                  p={0}
                  bg='red'
                  sx={{
                    '&:hover': {
                      backgroundColor: 'red',
                    },
                  }}
                  // h='100%'
                  icon={RxCross2}
                />
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
            c='red'
            icon={<BsTrash3 size={22} />}>
            حذف
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
