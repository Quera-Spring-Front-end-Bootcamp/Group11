import { createSlice } from '@reduxjs/toolkit';

export type ShareProjectModalSliceTypes = {
  open: boolean;
};

export const ShareProjectModalSlice = createSlice({
  name: 'ShareProjectModalSlice',
  initialState: {
    open: false,
  },
  reducers: {
    onOpen: (state: ShareProjectModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: ShareProjectModalSliceTypes) => {
      state.open = false;
    },
    onToggle: (state: ShareProjectModalSliceTypes) => {
      state.open = !state.open;
    },
  },
});

export const { onOpen, onClose, onToggle } = ShareProjectModalSlice.actions;

export default ShareProjectModalSlice;
