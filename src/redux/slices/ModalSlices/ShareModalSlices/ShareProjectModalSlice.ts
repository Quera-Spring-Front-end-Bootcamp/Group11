import { createSlice } from '@reduxjs/toolkit';

export type ShareProjectModalSliceTypes = {
  open: boolean;
  projectId: string;
};

export const ShareProjectModalSlice = createSlice({
  name: 'ShareProjectModalSlice',
  initialState: {
    open: false,
    projectId: '',
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
    setProject: (
      state: ShareProjectModalSliceTypes,
      actions: { payload: { projectId: string } }
    ) => {
      state.projectId = actions.payload.projectId;
    },
  },
});

export const { onOpen, onClose, onToggle } = ShareProjectModalSlice.actions;

export default ShareProjectModalSlice;
