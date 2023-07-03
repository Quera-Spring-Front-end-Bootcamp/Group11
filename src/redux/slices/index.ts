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
  CreateWorkSpaceModalSlice,
  CreateProjectModalSliceTypes,
  CreateWorkSpaceModalSliceTypes,
} from './ModalSlices/CreateModalSlices';

import {
  DeleteCommentModalSlice,
  DeleteCommentModalSliceTypes,
} from './ModalSlices/DeleteCommentModalSlice';
import {
  DeleteTagModalSlice,
  DeleteTagModalSliceTypes,
} from './ModalSlices/DeleteTagModalSlice';

import {
  ProjectSlice,
  ProjectSliceTypes,
  BoardHeaderSlice,
  BoardHeaderSliceTypes,
  CalenderViewSlice,
  CalenderViewSliceTypes,
} from './BoardSlices';

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
  CreateWorkSpaceModalSlice,
  ShareWorkspaceModalSlice,
  ///
  ProjectSlice,
  CalenderViewSlice,
  BoardHeaderSlice,
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
  CreateWorkSpaceModalSliceTypes,
  ProjectSliceTypes,
  CalenderViewSliceTypes,
  BoardHeaderSliceTypes,
};
