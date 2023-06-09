import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    loading: true,
    selectedProjectName: '',
    selectedProjectId: '',
    selectedProjectBoardData: [],
  },
  reducers: {
    setProjectName: (state: any, action: { payload: string }) => {
      state.selectedProjectName = action.payload;
    },
    setProjectData: (
      state: any,
      action: { payload: { id: string; boardData: any } }
    ) => {
      state.selectedProjectBoardData = action.payload.boardData;
      state.selectedProjectId = action.payload.id;
    },
    setLoading: (state: any, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    setSelectedProjectData: (
      state: any,
      action: { payload: { name: string; id: string; boardData: any } }
    ) => {
      state.selectedProjectBoardData = action.payload.boardData;
      state.selectedProjectId = action.payload.id;
      state.selectedProjectName = action.payload.name;
    },
  },
});

export default boardSlice;
