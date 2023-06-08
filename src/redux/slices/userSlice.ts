import { createSlice } from '@reduxjs/toolkit';
import { workspaceObj } from '../../util/types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    username: '',
    email: '',
    settings: [],
    firstname: '',
    lastname: '',
    workspaces: [],
    workspaceMember: [],
    allWorkspaces: [],
  },
  reducers: {
    setPage: (state: any, action) => {
      const { page } = action.payload;
      state.page = page;
    },
    setUserInfo: (
      state: any,
      action: {
        payload: {
          username: string;
          email: string;
          id: string;
        };
      }
    ) => {
      const { username, email, id } = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
    },
    setUserInfoByRequest: (
      state: any,
      action: {
        payload: {
          username: string;
          email: string;
          settings?: string;
          id: string;
          workspaces: Array<string>;
          workspaceMember: Array<string>;
          firstname: string;
          lastname: string;
        };
      }
    ) => {
      const {
        username,
        email,
        settings,
        id,
        workspaces,
        workspaceMember,
        firstname,
        lastname,
      } = action.payload;

      state.id = id;
      state.username = username;
      state.email = email;
      state.settings = settings;
      state.workspaces = workspaces;
      state.workspaceMember = workspaceMember;
      state.firstname = firstname;
      state.lastname = lastname;
    },
    setWorkspaces: (state: any, action: { payload: Array<workspaceObj> }) => {
      state.allWorkspaces = action.payload;
    },
  },
});

export default userSlice;
