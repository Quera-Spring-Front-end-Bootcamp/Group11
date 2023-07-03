import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { Board, Task, User } from '../../../util/types';

export type ProjectSliceTypes = {
  loading: boolean;
  selectedWorkspaceId: string;
  selectedProjectName: string;
  selectedProjectId: string;
  selectedProjectBoardData: Board[];
};

export const ProjectSlice = createSlice({
  name: 'board',
  initialState: {
    loading: true,
    selectedWorkspaceId: '',
    selectedProjectName: '',
    selectedProjectId: '',
    selectedProjectBoardData: [],
  },
  reducers: {
    setProjectName: (state: ProjectSliceTypes, action: { payload: string }) => {
      state.selectedProjectName = action.payload;
    },
    setProjectData: (
      state: ProjectSliceTypes,
      action: { payload: { id: string; boardData: Board[] } }
    ) => {
      state.selectedProjectBoardData = action.payload.boardData;
      state.selectedProjectId = action.payload.id;
    },
    setLoading: (state: ProjectSliceTypes, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    setSelectedProjectData: (
      state: ProjectSliceTypes,
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
      state: ProjectSliceTypes,
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
      state: ProjectSliceTypes,
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
    addBoard: (
      state: ProjectSliceTypes,
      action: {
        payload: { createdBoard: Board; prevBoardData: Array<Board> };
      }
    ) => {
      const { createdBoard, prevBoardData } = action.payload;
      state.selectedProjectBoardData = [...prevBoardData, createdBoard];
    },
    removeBoard: (
      state: ProjectSliceTypes,
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
      state: ProjectSliceTypes,
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
      state: ProjectSliceTypes,
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
      state: ProjectSliceTypes,
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
    addTaskAssignee: (
      state: ProjectSliceTypes,
      action: {
        payload: {
          boardId: string;
          taskId: string;
          newAssignee: User;
          prevBoardData: Array<Board>;
        };
      }
    ) => {
      const { boardId, taskId, newAssignee, prevBoardData } = action.payload;

      state.selectedProjectBoardData = prevBoardData.map((board: Board) => {
        if (board._id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              if (task._id === taskId) {
                return {
                  ...task,
                  taskAssigns: [...task.taskAssigns, newAssignee],
                };
              }
              return task;
            }),
          };
        }
        return board;
      });
    },
    deleteTaskAssignee: (
      state: ProjectSliceTypes,
      action: {
        payload: {
          boardId: string;
          taskId: string;
          deleteAssigneeId: string;
          prevBoardData: Array<Board>;
        };
      }
    ) => {
      const { boardId, taskId, deleteAssigneeId, prevBoardData } =
        action.payload;

      state.selectedProjectBoardData = prevBoardData.map((board: Board) => {
        if (board._id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              if (task._id === taskId) {
                return {
                  ...task,
                  taskAssigns: task.taskAssigns.filter(
                    (item) => item._id !== deleteAssigneeId
                  ),
                };
              }
              return task;
            }),
          };
        }
        return board;
      });
    },
    renameTask: (
      state: ProjectSliceTypes,
      action: {
        payload: {
          boardId: string;
          taskId: string;
          newName: string;
          prevBoardData: Array<Board>;
        };
      }
    ) => {
      const { boardId, taskId, newName, prevBoardData } = action.payload;
      state.selectedProjectBoardData = prevBoardData.map((board: Board) => {
        if (board._id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              if (task._id === taskId) {
                return {
                  ...task,
                  name: newName,
                };
              }
              return task;
            }),
          };
        }
        return board;
      });
    },
    editDescriptionOfTask: (
      state: ProjectSliceTypes,
      action: {
        payload: {
          boardId: string;
          taskId: string;
          newDescription: string;
          prevBoardData: Array<Board>;
        };
      }
    ) => {
      const { boardId, taskId, newDescription, prevBoardData } = action.payload;
      console.log(action.payload);
      state.selectedProjectBoardData = prevBoardData.map((board: Board) => {
        if (board._id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              if (task._id === taskId) {
                return {
                  ...task,
                  description: newDescription,
                };
              }
              return task;
            }),
          };
        }
        return board;
      });
    },
    // addTask: (
    //   state: ProjectSliceTypes,
    //   action: {
    //     payload: {
    //       newTag: Tag;
    //       taskId: string;
    //       boardId: string;
    //       prevBoardData: Array<Board>;
    //     };
    //   }
    // ) => {
    //   const { boardId, taskId, newDescription, prevBoardData } = action.payload;
    //   console.log(action.payload);
    //   state.selectedProjectBoardData = prevBoardData.map((board: Board) => {
    //     if (board._id === boardId) {
    //       return {
    //         ...board,
    //         tasks: board.tasks.map((task) => {
    //           if (task._id === taskId) {
    //             return {
    //               ...task,
    //               description: newDescription,
    //             };
    //           }
    //           return task;
    //         }),
    //       };
    //     }
    //     return board;
    //   });
    // },
    // removeTag: (
    //   state: ProjectSliceTypes,
    //   action: {
    //     payload: {
    //       boardId: string;
    //       taskId: string;
    //       newDescription: string;
    //       prevBoardData: Array<Board>;
    //     };
    //   }
    // ) => {
    //   const { boardId, taskId, newDescription, prevBoardData } = action.payload;
    //   console.log(action.payload);
    //   state.selectedProjectBoardData = prevBoardData.map((board: Board) => {
    //     if (board._id === boardId) {
    //       return {
    //         ...board,
    //         tasks: board.tasks.map((task) => {
    //           if (task._id === taskId) {
    //             return {
    //               ...task,
    //               description: newDescription,
    //             };
    //           }
    //           return task;
    //         }),
    //       };
    //     }
    //     return board;
    //   });
    // },
  },
});

export default ProjectSlice;
