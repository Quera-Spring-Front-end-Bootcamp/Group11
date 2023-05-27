import { createSlice } from '@reduxjs/toolkit';

export const CreateWorkSpaceModalSlice = createSlice({
  name: 'CreateWorkSpaceModal',
  initialState: {
    open: true,
  },
  reducers: {
    onOpen: (state: any) => {
      state.open = true;
    },
    onClose: (state: any) => {
      state.open = false;
    },
    onToggle: (state: any) => {
      state.open = !state.open;
    },
  },
});

export const { onOpen, onClose, onToggle } = CreateWorkSpaceModalSlice.actions;

export default CreateWorkSpaceModalSlice.reducer;
