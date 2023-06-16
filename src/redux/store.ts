import { configureStore } from '@reduxjs/toolkit';
////
import {
  userSlice,
  ShareProjectModalSlice,
  CreateWorkSpaceModalSlice,
  CreateTaskModalSlice,
  CreateProjectModalSlice,
  BoardSlice,
} from './slices';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    ////modal
    createWorkSpaceModal: CreateWorkSpaceModalSlice.reducer,
    ShareProjectModal: ShareProjectModalSlice.reducer,
    CreateTaskModal: CreateTaskModalSlice.reducer,
    CreateProjectModal: CreateProjectModalSlice.reducer,
    ////Board
    board: BoardSlice.reducer,
  },
});
