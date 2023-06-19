import { createSlice } from '@reduxjs/toolkit';

export interface NewTaskModalSliceTypes {
  open: boolean;
  taskTitle: string;
  priority: string;
  loading: boolean;
}

export const NewTaskModalSlice = createSlice({
  name: 'NewTaskModalSlice',
  initialState: {
    open: false,
    taskTitle: '',
    priority: '',
    loading: true,
  },
  reducers: {
    onOpen: (state: NewTaskModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: NewTaskModalSliceTypes) => {
      state.open = false;
    },
    setTaskInfo: (
      state: NewTaskModalSliceTypes,
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

export const { onOpen, onClose, setTaskInfo } = NewTaskModalSlice.actions;

export default NewTaskModalSlice;
