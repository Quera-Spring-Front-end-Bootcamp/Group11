import { createSlice } from '@reduxjs/toolkit';

export type CreateProjectModalSliceTypes = {
  open: boolean;
  wsId: string;
};

export const CreateProjectModalSlice = createSlice({
  name: 'CreateProjectModalSlice',
  initialState: {
    open: false,
    wsId: '',
  },
  reducers: {
    onOpen: (state: CreateProjectModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: CreateProjectModalSliceTypes) => {
      state.open = false;
    },
    onToggle: (state: CreateProjectModalSliceTypes) => {
      state.open = !state.open;
    },
    setWorkSpaceId: (
      state: CreateProjectModalSliceTypes,
      action: { payload: { wsId: string } }
    ) => {
      state.wsId = action.payload.wsId;
    },
  },
});
export const { onOpen, onClose, onToggle, setWorkSpaceId } =
  CreateProjectModalSlice.actions;
export default CreateProjectModalSlice;
