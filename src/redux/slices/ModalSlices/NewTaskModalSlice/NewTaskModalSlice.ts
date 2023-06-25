import { createSlice } from '@reduxjs/toolkit';

export interface NewTaskModalSliceTypes {
  open: boolean;
  taskTitle: string;
  priority: string;
  loading: boolean;
  boardId: string;
  deadline: number;
  deadLinePersianFormatted: string;
}

export const NewTaskModalSlice = createSlice({
  name: 'NewTaskModalSlice',
  initialState: {
    open: false,
    taskTitle: '',
    priority: '',
    loading: true,
    boardId: '',
    deadline: 0,
    deadLinePersianFormatted: '',
  },
  reducers: {
    onOpen: (state: NewTaskModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: NewTaskModalSliceTypes) => {
      state.open = false;
    },

    setBoardId: (
      state: NewTaskModalSliceTypes,
      action: { payload: { boardId: string } }
    ) => {
      const { boardId } = action.payload;
      state.boardId = boardId;
    },

    setDeadline: (
      state: NewTaskModalSliceTypes,
      action: {
        payload: { deadline: number; deadLinePersianFormatted: string };
      }
    ) => {
      const { deadline, deadLinePersianFormatted } = action.payload;
      state.deadline = deadline;
      state.deadLinePersianFormatted = deadLinePersianFormatted
    },

    // setTaskInfo: (
    //   state: NewTaskModalSliceTypes,
    //   action: { payload: { taskTitle: string; priority: string } }
    // ) => {
    //   const {
    //     payload: { taskTitle, priority },
    //   } = action;
    //   state.taskTitle = taskTitle;
    //   state.priority = priority;
    // },
  },
});

export const { onOpen, onClose, setBoardId } = NewTaskModalSlice.actions;

export default NewTaskModalSlice;
