import { createSlice } from '@reduxjs/toolkit';
import { Board, Project, workspaceObj } from '../../../util/types';

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
    addCreatedWorkspace: (
      state: any,
      action: {
        payload: {
          createdWorkspace: workspaceObj;
          prevWorkspacesData: Array<workspaceObj>;
        };
      }
    ) => {
      const { prevWorkspacesData, createdWorkspace } = action.payload;
      state.allWorkspaces = [...prevWorkspacesData, createdWorkspace];
    },
    addCreatedProjectToWorkspace: (
      state: any,
      action: {
        payload: {
          wsId: string;
          createdProject: Project;
          prevWorkspacesData: Array<workspaceObj>;
        };
      }
    ) => {
      const { prevWorkspacesData, createdProject, wsId } = action.payload;
      state.allWorkspaces = prevWorkspacesData.map((ws: workspaceObj) => {
        if (ws._id === wsId)
          return {
            ...ws,
            projects: [...ws.projects, { ...createdProject, boards: [] }],
          };

        return ws;
      });
    },
    updateWorkspaceName: (
      state: any,
      action: {
        payload: {
          wsId: string;
          updatedWorkspace: workspaceObj;
          prevWorkspacesData: Array<workspaceObj>;
        };
      }
    ) => {
      const { prevWorkspacesData, updatedWorkspace } = action.payload;
      state.allWorkspaces = prevWorkspacesData.map((ws) => {
        if (ws._id === updatedWorkspace._id) {
          return { ...ws, name: updatedWorkspace.name };
        }
        ///
        return ws;
      });
    },
    deleteWorkspace: (
      state: any,
      action: {
        payload: {
          wsId: string;
          prevWorkspacesData: Array<workspaceObj>;
        };
      }
    ) => {
      const { wsId, prevWorkspacesData } = action.payload;
      state.allWorkspaces = prevWorkspacesData.filter((ws) => ws._id !== wsId);
    },
  },
});

export default userSlice;
