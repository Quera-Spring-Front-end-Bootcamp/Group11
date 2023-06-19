import { useState } from 'react';
import {
  Flex,
  Loader,
  Menu as MantineMenu,
  MenuProps as MantineMenuProps,
} from '@mantine/core';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { BsTrash3 } from 'react-icons/bs';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

import { ConfirmationButton } from './Components';

import { BoardSlice } from '../../redux/slices/';
import { ClickOutsideWrapper, TextInput } from '..';

import { storeStateTypes } from '../../util/types';
import { deleteBoardApi, renameBoardApi } from '../../services/boardApi';

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
      setValue('name', '');
      await renameBoardApi(boardId, name);
      dispatch(
        BoardSlice.actions.renameBoard({
          boardId,
          newName: name,
          prevBoardData,
        })
      );
      toast.success('نام ستون مورد نظر با موفقیت تغییر یافت');
      setLoading(false);
      setEditingName(false);
    } catch (error) {
      console.log(error);
      toast.error('ساخت پروژه با خطا مواجه شد،‌لطفا مجددا تلاش فرمایید');
      setLoading(false);
    }
  };

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
  };

  const onCancelEditHandler = (e: MouseEvent) => {
    e.stopPropagation();
    setEditingName(false);
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
            padding: '12px !important',
            maxWidth: '200px',
            minWidth: '200px',
            transform: 'translate(5px,30px)',
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
                    onClick={!loading ? onCancelEditHandler : undefined}
                    bg='transparent'
                    icon={RxCross2}
                    loading={loading}
                    cancelButton
                  />
                </div>
                <form
                  onSubmit={
                    !loading ? handleSubmit(onSubmitNewName) : undefined
                  }>
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
                    onClick={
                      !loading
                        ? (handleSubmit(onSubmitNewName) as any)
                        : undefined
                    }
                    bg='green'
                    icon={AiOutlineCheck}
                    loading={loading}
                  />
                </div>
              </Flex>
            ) : (
              'ویرایش نام برد'
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
