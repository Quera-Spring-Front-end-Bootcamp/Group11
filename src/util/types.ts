import { NumberInputStylesParams } from '@mantine/core';
import { IconType } from 'react-icons';
import {
  userSliceTypes,
  CreateWorkSpaceModalSliceTypes,
  ShareProjectModalSliceTypes,
  ShareWorkspaceModalSliceTypes,
  CreateProjectModalSliceTypes,
  ProjectSliceTypes,
  NewTaskModalSliceTypes,
  EditTaskModalSliceTypes,
  CommentSliceTypes,
  DeleteTaskModalSliceTypes,
  DeleteCommentModalSliceTypes,
  DeleteTagModalSliceTypes,
  CalenderViewSliceTypes,
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
  label: string;
  name: string;
  position: NumberInputStylesParams;
  taskAssigns: User[];
  deadline: string;
  _id: string;
}

export type Comment = {
  text: string;
  createdAt: string;
  user: User;
  _id: string;
};

export type Tag = { _id: string; name: string; color: string };

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
  project: ProjectSliceTypes;
  calenderView: CalenderViewSliceTypes;
  createWorkSpaceModal: CreateWorkSpaceModalSliceTypes;
  ShareProjectModal: ShareProjectModalSliceTypes;
  ShareWorkspaceModal: ShareWorkspaceModalSliceTypes;
  CreateProjectModal: CreateProjectModalSliceTypes;
  NewTaskModal: NewTaskModalSliceTypes;
  EditTaskModal: EditTaskModalSliceTypes;
  Comments: CommentSliceTypes;
  DeleteTaskModal: DeleteTaskModalSliceTypes;
  DeleteCommentModal: DeleteCommentModalSliceTypes;
  DeleteTagModal: DeleteTagModalSliceTypes;
};
