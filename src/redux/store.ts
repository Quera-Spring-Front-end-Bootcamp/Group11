import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
////
import CreateWorkSpaceModalSlice from './slices/ModalSlices/CreateWorkSpaceModalSlice';
import ShareProjectModalSlice from './slices/ModalSlices/ShareProjectModalSlice';
////
import BoardSlice from './slices/BoardSlices/BoardSlice';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    ////modal
    createWorkSpaceModal: CreateWorkSpaceModalSlice.reducer,
    ShareProjectModal: ShareProjectModalSlice.reducer,
    ////Board
    board: BoardSlice.reducer,
  },
});
