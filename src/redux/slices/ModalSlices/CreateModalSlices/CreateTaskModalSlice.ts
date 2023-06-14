import { createSlice } from '@reduxjs/toolkit';

interface CreateTaskModalSliceTypes {
  open: boolean;
}

export const CreateTaskModalSlice = createSlice({
  name: 'CreateTaskModalSliceTypes',
  initialState: {
    open: false,
  },
  reducers: {
    onOpen: (state: CreateTaskModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: CreateTaskModalSliceTypes) => {
      state.open = false;
    },
    onToggle: (state: CreateTaskModalSliceTypes) => {
      state.open = !state.open;
    },
  },
});

export default CreateTaskModalSlice;
