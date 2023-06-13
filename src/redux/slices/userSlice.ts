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
    phone: '',
  },
  reducers: {
    setPage: (state: any, action) => {
      const { page } = action.payload;
      state.page = page;
    },
    setUserAccountInfo: (
      state: any,
      action: {
        payload: {
          username: string;
          email: string;
        };
      }
    ) => {
      const { username, email } = action.payload;
      state.username = username;
      state.email = email;
    },
    setUserPersonaInfo: (
      state: any,
      action: {
        payload: {
          firstname: string;
          lastname: string;
          phone: string;
        };
      }
    ) => {
      const { firstname, lastname, phone } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.phone = phone;
    },
    setUserInfoByRequest: (
      state: any,
      action: {
        payload: {
          username: string;
          email: string;
          settings?: Array<any>;
          id: string;
          workspaces: Array<string>;
          workspaceMember: Array<string>;
          firstname: string;
          lastname: string;
          phone: string;
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
        phone,
      } = action.payload;

      state.id = id;
      state.username = username;
      state.email = email;
      state.settings = settings;
      state.workspaces = workspaces;
      state.workspaceMember = workspaceMember;
      state.firstname = firstname;
      state.lastname = lastname;
      state.phone = phone;
    },
    setWorkspaces: (state: any, action: { payload: Array<workspaceObj> }) => {
      state.allWorkspaces = action.payload;
    },
  },
});

export default userSlice;
