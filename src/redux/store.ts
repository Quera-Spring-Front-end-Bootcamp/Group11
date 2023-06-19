import { configureStore } from '@reduxjs/toolkit';

import {
  userSlice,
  ShareProjectModalSlice,
  CreateWorkSpaceModalSlice,
  CreateTaskModalSlice,
  CreateProjectModalSlice,
  BoardSlice,
  ShareWorkspaceModalSlice,
  NewTaskModalSlice
} from './slices';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    ////modal
    createWorkSpaceModal: CreateWorkSpaceModalSlice.reducer,
    ShareProjectModal: ShareProjectModalSlice.reducer,
    ShareWorkspaceModal: ShareWorkspaceModalSlice.reducer,
    CreateTaskModal: CreateTaskModalSlice.reducer,
    CreateProjectModal: CreateProjectModalSlice.reducer,
    NewTaskModal: NewTaskModalSlice.reducer,
    ////Board
    board: BoardSlice.reducer,
  },
});
