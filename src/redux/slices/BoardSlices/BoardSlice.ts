import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { Board, Task } from '../../../util/types';

export type BoardSliceTypes = {
  loading: boolean;
  selectedWorkspaceId: string;
  selectedProjectName: string;
  selectedProjectId: string;
  selectedProjectBoardData: Board[];
};

export const BoardSlice = createSlice({
  name: 'board',
  initialState: {
    loading: true,
    selectedWorkspaceId: '',
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
      action: {
        payload: { wsId: string; name: string; id: string; boardData: Board[] };
      }
    ) => {
      const { wsId, name, id, boardData } = action.payload;
      state.selectedWorkspaceId = wsId;
      state.selectedProjectBoardData = boardData.sort(
        (a: Board, b: Board) => a.position - b.position
      );
      state.selectedProjectId = id;
      state.selectedProjectName = name;
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
    removeBoard: (
      state: BoardSliceTypes,
      action: {
        payload: { boardId: string; prevBoardData: Array<Board> };
      }
    ) => {
      const { boardId, prevBoardData } = action.payload;
      state.selectedProjectBoardData = prevBoardData.filter(
        (board: Board) => board._id !== boardId
      );
    },
    renameBoard: (
      state: BoardSliceTypes,
      action: {
        payload: {
          newName: string;
          boardId: string;
          prevBoardData: Array<Board>;
        };
      }
    ) => {
      const { boardId, prevBoardData, newName } = action.payload;

      state.selectedProjectBoardData = prevBoardData.map((board: Board) => {
        if (board._id === boardId) {
          return {
            ...board,
            name: newName,
          };
        }
        return board;
      });
    },
    addCreatedTaskToBoard: (
      state: BoardSliceTypes,
      action: {
        payload: {
          boardId: string;
          createdTask: Task;
          prevBoardData: Array<Board>;
        };
      }
    ) => {
      const { boardId, createdTask, prevBoardData } = action.payload;

      state.selectedProjectBoardData = prevBoardData.map((board: Board) => {
        if (board._id === boardId) {
          return {
            ...board,
            tasks: [...board.tasks, createdTask],
          };
        }
        return board;
      });
    },
    removeTaskFromBoard: (
      state: BoardSliceTypes,
      action: {
        payload: {
          taskId: string;
          prevBoardData: Array<Board>;
        };
      }
    ) => {
      const { taskId, prevBoardData } = action.payload;
      state.selectedProjectBoardData = prevBoardData.map((board) => {
        return {
          ...board,
          tasks: board.tasks.filter((task) => task._id !== taskId),
        };
      });
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
