import { useDispatch, useSelector } from 'react-redux';
import { Button as MantineBtn, Modal } from '@mantine/core';
import { BoardSlice, DeleteTaskModalSlice } from '../../../redux/slices';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { storeStateTypes } from '../../../util/types';
import { deleteTaskApi } from '../../../services/taskApi';
import Board from '../../../pages/Board';

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
    (state: storeStateTypes) => state.board.selectedProjectBoardData
  );

  const handleClose = () => {
    dispatch(DeleteTaskModalSlice.actions.onClose());
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTaskApi(taskId);
      toast.success('تسک با موفقیت حذف شد');
      dispatch(
        BoardSlice.actions.removeTaskFromBoard({ prevBoardData, taskId })
      );
      setLoading(false);
      handleClose();
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
        <div className='flex flex-row justify-center items-center gap-[20px]'>
          <MantineBtn
            loading={loading}
            onClick={handleConfirmDelete}
            color='red'>
            بله
          </MantineBtn>
          <MantineBtn
            onClick={handleClose}
            variant='outline'
            color='red'>
            خیر
          </MantineBtn>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;
