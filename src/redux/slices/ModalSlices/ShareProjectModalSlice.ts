import { createSlice } from '@reduxjs/toolkit';

export const ShareProjectModalSlice = createSlice({
  name: 'ShareProjectModalSlice',
  initialState: {
    open: false,
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

export const { onOpen, onClose, onToggle } = ShareProjectModalSlice.actions;

export default ShareProjectModalSlice;
