import { userSlice, userSliceTypes } from './UserSlice';

import {
  ShareProjectModalSlice,
  ShareWorkspaceModalSlice,
  ShareProjectModalSliceTypes,
  ShareWorkspaceModalSliceTypes,
} from './ModalSlices/ShareModalSlices';

import {
  NewTaskModalSlice,
  NewTaskModalSliceTypes,
} from './ModalSlices/NewTaskModalSlice';

import {
  EditTaskModalSlice,
  EditTaskModalSliceTypes,
} from './ModalSlices/EditTaskModalSlice';

import {
  DeleteTaskModalSlice,
  DeleteTaskModalSliceTypes,
} from './ModalSlices/DeleteTaskModalSlice';

import { CommentSlice, CommentSliceTypes } from './CommentSlice';

import {
  CreateProjectModalSlice,
  CreateTaskModalSlice,
  CreateWorkSpaceModalSlice,
  CreateProjectModalSliceTypes,
  CreateTaskModalSliceTypes,
  CreateWorkSpaceModalSliceTypes,
} from './ModalSlices/CreateModalSlices';

import { BoardSlice, BoardSliceTypes } from './BoardSlices';
import {
  DeleteCommentModalSlice,
  DeleteCommentModalSliceTypes,
} from './ModalSlices/DeleteCommentModalSlice';
import { DeleteTagModalSlice, DeleteTagModalSliceTypes } from './ModalSlices/DeleteTagModalSlice';

export {
  userSlice,
  ///
  NewTaskModalSlice,
  EditTaskModalSlice,
  DeleteTaskModalSlice,
  DeleteCommentModalSlice,
  DeleteTagModalSlice,
  CommentSlice,
  ShareProjectModalSlice,
  CreateProjectModalSlice,
  CreateTaskModalSlice,
  CreateWorkSpaceModalSlice,
  ShareWorkspaceModalSlice,

  ///
  BoardSlice,
};

export type {
  NewTaskModalSliceTypes,
  EditTaskModalSliceTypes,
  DeleteTaskModalSliceTypes,
  DeleteCommentModalSliceTypes,
  DeleteTagModalSliceTypes,
  CommentSliceTypes,
  userSliceTypes,
  ShareProjectModalSliceTypes,
  ShareWorkspaceModalSliceTypes,
  CreateProjectModalSliceTypes,
  CreateTaskModalSliceTypes,
  CreateWorkSpaceModalSliceTypes,
  BoardSliceTypes,
};
