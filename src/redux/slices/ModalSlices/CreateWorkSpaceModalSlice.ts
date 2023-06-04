import { createSlice } from '@reduxjs/toolkit';

export const CreateWorkSpaceModalSlice = createSlice({
  name: 'CreateWorkSpaceModal',
  initialState: {
    open: false,
  },
  reducers: {
    onOpen: (state: any) => {
      console.log('hello');
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

export default CreateWorkSpaceModalSlice;
