import { createSlice } from '@reduxjs/toolkit';

export interface DeleteTaskModalSliceTypes {
  open: boolean;
  taskId: string;
}

export const DeleteTaskModalSlice = createSlice({
  name: 'DeleteTaskModalSlice',
  initialState: {
    open: false,
    taskId: '',
  },
  reducers: {
    onOpen: (state: DeleteTaskModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: DeleteTaskModalSliceTypes) => {
      state.open = false;
    },
    setTaskId: (
      state: DeleteTaskModalSliceTypes,
      action: { payload: { taskId: string } }
    ) => {
      const { taskId } = action.payload;
      state.taskId = taskId;
    },
  },
});

export const { onOpen, onClose, setTaskId } = DeleteTaskModalSlice.actions;

export default DeleteTaskModalSlice;
