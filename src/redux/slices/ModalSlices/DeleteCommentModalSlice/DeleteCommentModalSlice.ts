import { createSlice } from '@reduxjs/toolkit';

export interface DeleteCommentModalSliceTypes {
  open: boolean;
  commentId: string;
}

export const DeleteCommentModalSlice = createSlice({
  name: 'DeleteCommentModalSlice',
  initialState: {
    open: false,
    commentId: '',
  },
  reducers: {
    onOpen: (state: DeleteCommentModalSliceTypes) => {
      state.open = true;
    },
    onClose: (state: DeleteCommentModalSliceTypes) => {
      state.open = false;
    },
    setCommentId: (
      state: DeleteCommentModalSliceTypes,
      action: { payload: { commentId: string } }
    ) => {
      const { commentId } = action.payload;
      state.commentId = commentId;
    },
  },
});

export const { onOpen, onClose, setCommentId } =
  DeleteCommentModalSlice.actions;

export default DeleteCommentModalSlice;
