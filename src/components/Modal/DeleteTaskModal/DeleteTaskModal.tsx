import { useDispatch, useSelector } from 'react-redux';
import { Flex, Modal } from '@mantine/core';
import { ProjectSlice, DeleteTaskModalSlice } from '../../../redux/slices';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { storeStateTypes } from '../../../util/types';
import { deleteTaskApi } from '../../../services/taskApi';
import { Button } from '../..';

const DeleteTaskModal = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const open = useSelector(
    (state: storeStateTypes) => state.DeleteTaskModal.open
  );
  const taskId = useSelector(
    (state: storeStateTypes) => state.DeleteTaskModal.taskId
  );
  const prevBoardData = useSelector(
    (state: storeStateTypes) => state.project.selectedProjectBoardData
  );

  const handleClose = () => {
    dispatch(DeleteTaskModalSlice.actions.onClose());
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteTaskApi(taskId);
      toast.success('تسک با موفقیت حذف شد');
      dispatch(
        ProjectSlice.actions.removeTaskFromBoard({ prevBoardData, taskId })
      );
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      console.log(error);
      toast.error('مشکلی پیش آمده است، لطفا مجددا تلاش فرمایید.');
      handleClose();
    }
  };
  return (
    <Modal
      centered
      opened={open}
      onClose={handleClose}>
      <div className='flex flex-col justify-center items-center gap-[40px] rounded-[20px]'>
        <span className='text-rose-700 text-[25px] font-bold'>
          از حذف تسک مطمئن هستید؟
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

export default DeleteTaskModal;
