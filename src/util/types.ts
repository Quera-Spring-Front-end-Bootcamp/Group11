import { NumberInputStylesParams } from '@mantine/core';
import { IconType } from 'react-icons';
import {
  userSliceTypes,
  CreateWorkSpaceModalSliceTypes,
  ShareProjectModalSliceTypes,
  ShareWorkspaceModalSliceTypes,
  CreateTaskModalSliceTypes,
  CreateProjectModalSliceTypes,
  BoardSliceTypes,
  NewTaskModalSliceTypes,
  EditTaskModalSliceTypes,
  DeleteTaskModalSliceTypes,
} from '../redux/slices';

export interface tabObject {
  value: string;
  icon: IconType;
  text: string;
}

export interface workspaceObj {
  members: Array<{ user: User }>;
  name: string;
  projects: Array<Project>;
  user?: User;
  _id: string;
  color: string;
}
export interface User {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  profile_url: string;
}
export interface Project {
  _id: string;
  boards?: string[];
  members?: Member[];
  name: string;
}

export type Member = {
  user: User;
  role: 'member' | 'owner';
};

export interface Task {
  board: string;
  comments: Array<Comment>;
  description: string;
  label: Array<Label>;
  name: string;
  position: NumberInputStylesParams;
  taskAssigns: User[];
  _id: string;
}

export type Comment = {
  text: string;
};
export type Label = {
  text: string;
};

export interface Board {
  name: string;
  position: number;
  project: string;
  tasks: Task[];
  _id: string;
  color: string;
}

////////////

export type storeStateTypes = {
  user: userSliceTypes;
  board: BoardSliceTypes;
  createWorkSpaceModal: CreateWorkSpaceModalSliceTypes;
  ShareProjectModal: ShareProjectModalSliceTypes;
  ShareWorkspaceModal: ShareWorkspaceModalSliceTypes;
  CreateTaskModal: CreateTaskModalSliceTypes;
  CreateProjectModal: CreateProjectModalSliceTypes;
  NewTaskModal: NewTaskModalSliceTypes;
  EditTaskModal: EditTaskModalSliceTypes;
  DeleteTaskModal: DeleteTaskModalSliceTypes;
};
