import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { Board, Task } from '../../../util/types';

export type BoardSliceTypes = {
  loading: boolean;
  selectedProjectName: string;
  selectedProjectId: string;
  selectedProjectBoardData: Board[];
};

export const BoardSlice = createSlice({
  name: 'board',
  initialState: {
    loading: true,
    selectedProjectName: '',
    selectedProjectId: '',
    selectedProjectBoardData: [],
  },
  reducers: {
    setProjectName: (state: BoardSliceTypes, action: { payload: string }) => {
      state.selectedProjectName = action.payload;
    },
    setProjectData: (
      state: BoardSliceTypes,
      action: { payload: { id: string; boardData: Board[] } }
    ) => {
      state.selectedProjectBoardData = action.payload.boardData;
      state.selectedProjectId = action.payload.id;
    },
    setLoading: (state: BoardSliceTypes, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    setSelectedProjectData: (
      state: BoardSliceTypes,
      action: { payload: { name: string; id: string; boardData: Board[] } }
    ) => {
      state.selectedProjectBoardData = action.payload.boardData.sort(
        (a: Board, b: Board) => a.position - b.position
      );
      state.selectedProjectId = action.payload.id;
      state.selectedProjectName = action.payload.name;
    },
    updateBoardPosition: (
      state: BoardSliceTypes,
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
      state: BoardSliceTypes,
      action: {
        payload: { newData: Record<string, Task[]>; prevData: Array<Board> };
      }
    ) => {
      state.selectedProjectBoardData = action.payload.prevData.map(
        (board: Board) => ({
          ...board,
          tasks: action.payload.newData[board._id],
        })
      );
    },
    // addCreatedBoard: (
    //   state: BoardSliceTypes,
    //   action: {
    //     payload: { newBoard: any; prevData: Array<Board> };
    //   }
    // ) => {
    //   state.selectedProjectBoardData = [
    //     ...action.payload.prevData,
    //     action.payload.newBoard,
    //   ];
    // },
  },
});

export default BoardSlice;
