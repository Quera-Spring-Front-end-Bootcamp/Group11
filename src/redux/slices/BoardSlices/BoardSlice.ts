import { createSlice } from '@reduxjs/toolkit';
import { tabValues } from '../../../constants';

export const boardSlice = createSlice({
  name: 'borad',
  initialState: {
    boardComponent: tabValues[0].value,
  },
  reducers: {
    setBoardComponent: (state: any, action) => {
      state.boardComponent = action.payload;
    },
  },
});

export default boardSlice;
