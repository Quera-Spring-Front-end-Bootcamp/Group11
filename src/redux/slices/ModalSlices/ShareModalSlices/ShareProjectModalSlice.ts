import { createSlice } from '@reduxjs/toolkit';

interface ShareProjectModalSliceTypes {
  open: boolean;
}

export const ShareProjectModalSlice = createSlice({
  name: 'ShareProjectModalSlice',
  initialState: {
    open: false,
    title: '',
    link: '',
    data: [],
    loading: true,
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
    // setInfo: (
    //   state: ShareProjectModalSliceTypes,
    //   action: { payload: { title: string; link: string; data: any } }
    // ) => {
    //   const {
    //     payload: { data, link, title },
    //   } = action;
    //   state.data = data;
    //   state.link = link;
    //   state.title = title;
    // },
  },
});

export const { onOpen, onClose, onToggle } = ShareProjectModalSlice.actions;

export default ShareProjectModalSlice;
