import { createSlice } from '@reduxjs/toolkit';

interface ShareWorkspaceModalSliceTypes {
  open: boolean;
  wsId: string;
}

export const ShareWorkspaceModalSlice = createSlice({
  name: 'ShareWorkspaceModalSlice',
  initialState: {
    open: false,
    wsId: '',
  },
  reducers: {
    onOpen: (state: ShareWorkspaceModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: ShareWorkspaceModalSliceTypes) => {
      state.open = false;
    },
    onToggle: (state: ShareWorkspaceModalSliceTypes) => {
      state.open = !state.open;
    },
    setWs: (
      state: ShareWorkspaceModalSliceTypes,
      actions: { payload: { wsId: string } }
    ) => {
      state.wsId = actions.payload.wsId;
    },
  },
});

export const { onOpen, onClose, onToggle } = ShareWorkspaceModalSlice.actions;

export default ShareWorkspaceModalSlice;
