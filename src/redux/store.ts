import { configureStore } from '@reduxjs/toolkit';

import {
  userSlice,
  ShareProjectModalSlice,
  CreateWorkSpaceModalSlice,
  CreateTaskModalSlice,
  CreateProjectModalSlice,
  ProjectSlice,
  ShareWorkspaceModalSlice,
  NewTaskModalSlice,
  EditTaskModalSlice,
  DeleteTaskModalSlice,
  CalenderViewSlice,
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
    EditTaskModal: EditTaskModalSlice.reducer,
    DeleteTaskModal: DeleteTaskModalSlice.reducer,
    ////Board
    project: ProjectSlice.reducer,
    calenderView: CalenderViewSlice.reducer,
  },
});
