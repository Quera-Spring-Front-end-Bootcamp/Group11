import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { Board, Task } from '../../../util/types';

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
      state.selectedProjectBoardData = action.payload.boardData.sort(
        (a: Board, b: Board) => a.position - b.position
      );
      state.selectedProjectId = action.payload.id;
      state.selectedProjectName = action.payload.name;
    },
    updateBoardPosition: (
      state: any,
      action: { payload: { activeBoard: string; overBoard: string } }
    ) => {
      const activeBoardIndex = state.selectedProjectBoardData.findIndex(
        (board: Board) => board._id === action.payload.activeBoard
      );
      const overBoardIndex = state.selectedProjectBoardData.findIndex(
        (board: Board) => board._id === action.payload.overBoard
      );

      state.selectedProjectBoardData = arrayMove(
        state.selectedProjectBoardData,
        activeBoardIndex,
        overBoardIndex
      );
    },
    updateBoardTaskPositions: (
      state: any,
      action: {
        payload: { newData: any; prevData: Array<Board> };
      }
    ) => {
      state.selectedProjectBoardData = action.payload.prevData.map(
        (board: Board) => ({
          ...board,
          tasks: action.payload.newData[board._id],
        })
      );
    },
    addCreatedBoard: (
      state: any,
      action: {
        payload: { newBoard: any; prevData: Array<Board> };
      }
    ) => {
      state.selectedProjectBoardData = [
        ...action.payload.prevData,
        action.payload.newBoard,
      ];
    },
  },
});

export default boardSlice;
