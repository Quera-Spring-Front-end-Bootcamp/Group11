import { useDispatch, useSelector } from 'react-redux';
import { Button as MantineBtn, Modal } from '@mantine/core';
import { DeleteTaskModalSlice } from '../../../redux/slices';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { storeStateTypes } from '../../../util/types';
import { deleteTaskApi } from '../../../services/taskApi';

const DeleteTaskModal = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const open = useSelector(
    (state: storeStateTypes) => state.DeleteTaskModal.open
  );
  const taskId = useSelector(
    (state: storeStateTypes) => state.NewTaskModal.boardId
  );

  const handleClose = () => {
    dispatch(DeleteTaskModalSlice.actions.onClose());
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTaskApi(taskId);
      toast.success('تسک با موفقیت حذف شد');
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error('حذف تسک با مشکل مواجه شد');
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
