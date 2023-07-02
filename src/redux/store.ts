import { configureStore } from '@reduxjs/toolkit';

import {
  userSlice,
  ShareProjectModalSlice,
  CreateWorkSpaceModalSlice,
  CreateProjectModalSlice,
  ProjectSlice,
  ShareWorkspaceModalSlice,
  NewTaskModalSlice,
  EditTaskModalSlice,
  DeleteTaskModalSlice,
  CommentSlice,
  DeleteCommentModalSlice,
  DeleteTagModalSlice,
  CalenderViewSlice,
} from './slices';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    ////modal
    createWorkSpaceModal: CreateWorkSpaceModalSlice.reducer,
    ShareProjectModal: ShareProjectModalSlice.reducer,
    ShareWorkspaceModal: ShareWorkspaceModalSlice.reducer,
    CreateProjectModal: CreateProjectModalSlice.reducer,
    NewTaskModal: NewTaskModalSlice.reducer,
    EditTaskModal: EditTaskModalSlice.reducer,
    DeleteTaskModal: DeleteTaskModalSlice.reducer,
    DeleteCommentModal: DeleteCommentModalSlice.reducer,
    DeleteTagModal: DeleteTagModalSlice.reducer,
    Comments: CommentSlice.reducer,
    ////Board
    project: ProjectSlice.reducer,
    calenderView: CalenderViewSlice.reducer,
  },
});
