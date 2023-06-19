import { useState } from 'react';
import {
  Flex,
  Loader,
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
import { IconType } from 'react-icons';
import toast from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

import { ConfirmationButton } from './Components';

import { BoardSlice } from '../../redux/slices/';
import { Button, ClickOutsideWrapper, TextInput } from '..';
import {
  CreateProjectModalSlice,
  ShareWorkspaceModalSlice,
} from '../../redux/slices';

import {
  deleteWorkspaceApi,
  updateWorkspaceApi,
} from '../../services/workspaceApi';
import { storeStateTypes } from '../../util/types';
import { deleteBoardApi, renameBoardApi } from '../../services/boardApi';
import { useNavigate } from 'react-router-dom';

interface MenuProps extends MantineMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
}
export const BoardMenu = ({ open, setOpen, boardId }: MenuProps) => {
  const [loading, setLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const prevBoardData = useSelector(
    (state: storeStateTypes) => state.board.selectedProjectBoardData
  );
  const dispatch = useDispatch();

  // const onCreateClickHandler = () => {
  //   dispatch(CreateProjectModalSlice.actions.onOpen());
  //   dispatch(CreateProjectModalSlice.actions.setWorkSpaceId({ wsId }));
  //   setOpen(false);
  // };

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
      await renameBoardApi(boardId, name);
      dispatch(
        BoardSlice.actions.renameBoard({
          boardId,
          newName: name,
          prevBoardData,
        })
      );
      toast.success('نام ستون مورد نظر با موفقیت تغییر یافت');
      setValue('name', '');
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('ساخت پروژه با خطا مواجه شد،‌لطفا مجددا تلاش فرمایید');
      setLoading(false);
    }
  };

  // const onShareClickHandler = () => {
  //   dispatch(ShareWorkspaceModalSlice.actions.onOpen());
  //   dispatch(ShareWorkspaceModalSlice.actions.setWs({ wsId }));
  //   setOpen(false);
  // };

  const onDeleteClickHandler = async (e: MouseEvent) => {
    e.stopPropagation();
    setDeleteLoading(true);

    try {
      await deleteBoardApi(boardId);

      dispatch(BoardSlice.actions.removeBoard({ boardId, prevBoardData }));

      toast.success('ستون مورد نظر با موفقیت حذف گردید');
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
    // navigate(0)
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
            padding: '12px !important',
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
          {/* <MantineMenu.Item
            onClick={() => {
              setEditingName(true);
            }}
            icon={!editingName && <FiEdit size={22} />}>
            ویرایش نام سطون
          </MantineMenu.Item> */}
          <MantineMenu.Item
            onClick={() => {
              setEditingName(true);
            }}
            icon={!editingName && <FiEdit size={22} />}>
            {editingName ? (
              <Flex
                gap='2px'
                direction={'row'}
                align={'center'}>
                <TextInput
                  id='name'
                  register={register}
                  errors={errors}
                  required
                />
                <ConfirmationButton
                  onClick={handleSubmit(onSubmitNewName) as any}
                  bg='green'
                  fullHeight
                  icon={AiOutlineCheck}
                />
                <ConfirmationButton
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    setEditingName(false);
                  }}
                  bg='gray'
                  fullHeight
                  icon={RxCross2}
                />
                {/* <Button
                  onClick={handleSubmit(onSubmitNewName)}
                  p={0}
                  // loading={loading}
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
                /> */}
              </Flex>
            ) : (
              ' ویرایش نام ورک‌اسپیس'
            )}
          </MantineMenu.Item>
          <MantineMenu.Item icon={<AiOutlinePlus size={22} />}>
            افزودن تسک
          </MantineMenu.Item>

          <MantineMenu.Item icon={<IoColorPaletteOutline size={22} />}>
            آرشیو تمام تسک‌ها
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
              'حذف ستون'
            )}
          </MantineMenu.Item>
        </MantineMenu.Dropdown>
      </MantineMenu>
    </ClickOutsideWrapper>
  );
};
