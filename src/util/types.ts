import { IconType } from 'react-icons';

export interface tabObject {
  value: string;
  icon: IconType;
  text: string;
}

export interface workspaceObj {
  members: Array<{ user: User }>;
  name: string;
  projects: Array<Project>;
  user?: string;
  _id: string;
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
  boards: string[];
  members: string[];
  name: string;
}
