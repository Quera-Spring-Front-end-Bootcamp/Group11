import { createSlice } from '@reduxjs/toolkit';

export type CreateWorkSpaceModalSliceTypes = {
  open: boolean;
};

export const CreateWorkSpaceModalSlice = createSlice({
  name: 'CreateWorkSpaceModal',
  initialState: {
    open: false,
  },
  reducers: {
    onOpen: (state: CreateWorkSpaceModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: CreateWorkSpaceModalSliceTypes) => {
      state.open = false;
    },
    onToggle: (state: CreateWorkSpaceModalSliceTypes) => {
      state.open = !state.open;
    },
  },
});

export const { onOpen, onClose, onToggle } = CreateWorkSpaceModalSlice.actions;

export default CreateWorkSpaceModalSlice;
