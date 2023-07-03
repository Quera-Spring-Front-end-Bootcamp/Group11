import { createSlice } from '@reduxjs/toolkit';

export type BoardHeaderSliceTypes = {
  searchValue: string;
};

export const BoardHeaderSlice = createSlice({
  name: 'boardHeader',
  initialState: {
    searchValue: '',
  },

  reducers: {
    setSearchValue: (
      state: BoardHeaderSliceTypes,
      action: {
        payload: {
          searchValue: string;
        };
      }
    ) => {
      const { searchValue } = action.payload;

      state.searchValue = searchValue;
    },
  },
});

export default BoardHeaderSlice;
