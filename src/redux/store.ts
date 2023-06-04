import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import CreateWorkSpaceModalReducer from './slices/ModalSlices/CreateWorkSpaceModalSlice';

export default configureStore({
  reducer: {
    auth: authReducer.reducer,
    CreateWorkSpaceModal: CreateWorkSpaceModalReducer.reducer,
  },
});
