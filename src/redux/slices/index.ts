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
} from './ModalSlices/NewTaskModalSlice/NewTaskModalSlice';

import {
  CreateProjectModalSlice,
  CreateTaskModalSlice,
  CreateWorkSpaceModalSlice,
  CreateProjectModalSliceTypes,
  CreateTaskModalSliceTypes,
  CreateWorkSpaceModalSliceTypes,
} from './ModalSlices/CreateModalSlices';

import { BoardSlice, BoardSliceTypes } from './BoardSlices';

export {
  userSlice,
  ///
  NewTaskModalSlice,
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
  userSliceTypes,
  ShareProjectModalSliceTypes,
  ShareWorkspaceModalSliceTypes,
  CreateProjectModalSliceTypes,
  CreateTaskModalSliceTypes,
  CreateWorkSpaceModalSliceTypes,
  BoardSliceTypes,
};
