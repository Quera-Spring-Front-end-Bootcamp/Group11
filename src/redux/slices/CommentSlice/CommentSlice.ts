import { createSlice } from '@reduxjs/toolkit';

export interface CommentSliceTypes {
  comments: object[];
}

export const CommentSlice = createSlice({
  name: 'CommentSlice',
  initialState: {
    comments: [{}],
  },
  reducers: {
    getComment: (
      state: CommentSliceTypes,
      action: {
        payload: {
          comments: object[];
        };
      }
    ) => {
      const {
        payload: { comments },
      } = action;
      state.comments = comments;
    },
    deleteComment: (
      state: CommentSliceTypes,
      action: {
        payload: {
          comments: object[];
        };
      }
    ) => {
      const {
        payload: { comments },
      } = action;
      state.comments = comments;
    },

    addComment: (
      state: CommentSliceTypes,
      action: {
        payload: {
          newComment: object;
          prevComments: object[];
        };
      }
    ) => {
      const {
        payload: { newComment, prevComments },
      } = action;
      state.comments = [...prevComments, newComment];
    },
  },
});

export const { getComment } = CommentSlice.actions;

export default CommentSlice;
