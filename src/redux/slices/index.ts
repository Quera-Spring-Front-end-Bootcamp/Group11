import { userSlice, userSliceTypes } from './UserSlice';
import {
  ShareProjectModalSlice,
  ShareWorkspaceModalSlice,
  ShareProjectModalSliceTypes,
  ShareWorkspaceModalSliceTypes,
} from './ModalSlices/ShareModalSlices';

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
  ShareProjectModalSlice,
  CreateProjectModalSlice,
  CreateTaskModalSlice,
  CreateWorkSpaceModalSlice,
  ShareWorkspaceModalSlice,
  ///
  BoardSlice,
};

export type {
  userSliceTypes,
  ShareProjectModalSliceTypes,
  ShareWorkspaceModalSliceTypes,
  CreateProjectModalSliceTypes,
  CreateTaskModalSliceTypes,
  CreateWorkSpaceModalSliceTypes,
  BoardSliceTypes,
};
