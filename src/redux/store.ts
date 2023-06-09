import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
////
import CreateWorkSpaceModalSlice from './slices/ModalSlices/CreateWorkSpaceModalSlice';
import ShareProjectModalSlice from './slices/ModalSlices/ShareModalSlice';
////
import BoardSlice from './slices/BoardSlices/BoardSlice';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    ////modal
    createWorkSpaceModal: CreateWorkSpaceModalSlice.reducer,
    ShareProjectModal: ShareProjectModalSlice.reducer,
    ////Board
    board: BoardSlice.reducer,
  },
});
