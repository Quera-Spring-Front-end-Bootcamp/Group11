import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
////
import CreateWorkSpaceModalSlice from './slices/ModalSlices/CreateModalSlices/CreateWorkSpaceModalSlice';
import ShareProjectModalSlice from './slices/ModalSlices/ShareModalSlice';
////
import BoardSlice from './slices/BoardSlices/BoardSlice';
import CreateTaskModalSlice from './slices/ModalSlices/CreateModalSlices/CreateTaskModalSlice';
import CreateProjectModalSlice from './slices/ModalSlices/CreateModalSlices/CreateProjectModalSlice';
import NewTaskModalSlice from './slices/ModalSlices/NewTaskModalSlice';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    ////modal
    createWorkSpaceModal: CreateWorkSpaceModalSlice.reducer,
    ShareProjectModal: ShareProjectModalSlice.reducer,
    CreateTaskModal: CreateTaskModalSlice.reducer,
    CreateProjectModal: CreateProjectModalSlice.reducer,
    NewTaskModal: NewTaskModalSlice.reducer,
    ////Board
    board: BoardSlice.reducer,
  },
});
