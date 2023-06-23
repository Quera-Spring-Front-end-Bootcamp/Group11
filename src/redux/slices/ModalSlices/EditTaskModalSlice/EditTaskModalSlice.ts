import { createSlice } from '@reduxjs/toolkit';

export interface EditTaskModalSliceTypes {
  open: boolean;
  taskTitle: string;
  priority: string;
  loading: boolean;
}

export const EditTaskModalSlice = createSlice({
  name: 'EditTaskModalSlice',
  initialState: {
    open: false,
    taskTitle: '',
    priority: '',
    loading: true,
  },
  reducers: {
    onOpen: (state: EditTaskModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: EditTaskModalSliceTypes) => {
      state.open = false;
    },
    setTaskInfo: (
      state: EditTaskModalSliceTypes,
      action: { payload: { taskTitle: string; priority: string } }
    ) => {
      const {
        payload: { taskTitle, priority },
      } = action;
      state.taskTitle = taskTitle;
      state.priority = priority;
    },
  },
});

export const { onOpen, onClose, setTaskInfo } = EditTaskModalSlice.actions;

export default EditTaskModalSlice;
