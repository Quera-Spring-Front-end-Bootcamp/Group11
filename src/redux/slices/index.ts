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

import {
  CreateProjectModalSlice,
  CreateTaskModalSlice,
  CreateWorkSpaceModalSlice,
  CreateProjectModalSliceTypes,
  CreateTaskModalSliceTypes,
  CreateWorkSpaceModalSliceTypes,
} from './ModalSlices/CreateModalSlices';

import {
  CalenderViewSlice,
  CalenderViewSliceTypes,
} from './BoardSlices/CalenderViewSlice';

import { ProjectSlice, ProjectSliceTypes } from './BoardSlices';

export {
  userSlice,
  ///
  NewTaskModalSlice,
  EditTaskModalSlice,
  DeleteTaskModalSlice,
  ShareProjectModalSlice,
  CreateProjectModalSlice,
  CreateTaskModalSlice,
  CreateWorkSpaceModalSlice,
  ShareWorkspaceModalSlice,
  ///
  ProjectSlice,
  CalenderViewSlice,
};

export type {
  NewTaskModalSliceTypes,
  EditTaskModalSliceTypes,
  DeleteTaskModalSliceTypes,
  userSliceTypes,
  ShareProjectModalSliceTypes,
  ShareWorkspaceModalSliceTypes,
  CreateProjectModalSliceTypes,
  CreateTaskModalSliceTypes,
  CreateWorkSpaceModalSliceTypes,
  ProjectSliceTypes,
  CalenderViewSliceTypes,
};
