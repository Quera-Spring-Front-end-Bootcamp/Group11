import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import CreateWorkSpaceModalReducer from './slices/ModalSlices/CreateWorkSpaceModalSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    CreateWorkSpaceModal: CreateWorkSpaceModalReducer,
  },
});
