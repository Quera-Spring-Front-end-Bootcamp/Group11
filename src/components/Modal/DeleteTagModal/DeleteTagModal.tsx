import { useDispatch, useSelector } from 'react-redux';
import { Flex, Modal } from '@mantine/core';
import { DeleteTagModalSlice, EditTaskModalSlice } from '../../../redux/slices';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { storeStateTypes } from '../../../util/types';
import { Button } from '../..';
import { deleteTagApi } from '../../../services/tagApi';

const DeleteTagModal = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const open = useSelector(
    (state: storeStateTypes) => state.DeleteTagModal.open
  );
  const tagName = useSelector(
    (state: storeStateTypes) => state.DeleteTagModal.tagName
  );
  const prevTags = useSelector(
    (state: storeStateTypes) => state.EditTaskModal.taskTags
  );
  const handleClose = () => {
    dispatch(DeleteTagModalSlice.actions.onClose());
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteTagApi(tagName);
      toast.success('تگ با موفقیت حذف شد');
      dispatch(
        EditTaskModalSlice.actions.deleteTag({
          tagName,
          prevTags,
        })
      );
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error('مشکلی پیش آمده است، لطفا مجددا تلاش فرمایید.');
      setLoading(false);
      handleClose();
    }
  };
  return (
    <Modal
      zIndex={500}
      centered
      opened={open}
      onClose={handleClose}>
      <div className='flex flex-col justify-center items-center gap-[40px] rounded-[20px]'>
        <span className='text-rose-700 text-[25px] font-bold'>
          از حذف تگ مطمئن هستید؟
        </span>
        <Flex className='flex flex-row justify-center items-center gap-[20px] w-full'>
          <Button
            loading={loading}
            onClick={handleConfirmDelete}
            c='white'
            w='50%'
            bg='red'
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: '#ff000099',
                },
              },
            }}>
            بله
          </Button>
          <Button
            onClick={handleClose}
            variant='outline'
            c='#000'
            bg='#0000000'
            w='50%'
            styles={{
              root: {
                border: '2px solid red',
                '&:hover': {
                  backgroundColor: '#00000010',
                },
              },
            }}>
            خیر
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default DeleteTagModal;
