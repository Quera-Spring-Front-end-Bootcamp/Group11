import { createSlice } from '@reduxjs/toolkit';

export interface DeleteTagModalSliceTypes {
  open: boolean;
  tagName: string;
}

export const DeleteTagModalSlice = createSlice({
  name: 'DeleteTagModalSlice',
  initialState: {
    open: false,
    tagName: '',
  },
  reducers: {
    onOpen: (state: DeleteTagModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: DeleteTagModalSliceTypes) => {
      state.open = false;
    },
    setTagName: (
      state: DeleteTagModalSliceTypes,
      action: { payload: { tagName: string } }
    ) => {
      const { tagName } = action.payload;
      state.tagName = tagName;
    },
  },
});

export const { onOpen, onClose, setTagName } = DeleteTagModalSlice.actions;

export default DeleteTagModalSlice;
