import { createSlice } from '@reduxjs/toolkit';
import { Project, workspaceObj } from '../../../util/types';

export type userSliceTypes = {
  id: string;
  username: string;
  email: string;
  settings: string[];
  firstname: string;
  lastname: string;
  allWorkspaces: workspaceObj[];
  phone: string;
  profile_url: string;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    username: '',
    email: '',
    settings: [],
    firstname: '',
    lastname: '',
    allWorkspaces: [],
    phone: '',
    profile_url: '',
  },
  reducers: {
    setUserAccountInfo: (
      state: userSliceTypes,
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
      state: userSliceTypes,
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
      state: userSliceTypes,
      action: {
        payload: {
          username: string;
          email: string;
          settings?: string[];
          id: string;
          workspaces: Array<string>;
          workspaceMember: Array<string>;
          firstname: string;
          lastname: string;
          phone: string;
          profile_url: string;
        };
      }
    ) => {
      const {
        username,
        email,
        id,
        // settings,
        // workspaces,
        // workspaceMember,
        firstname,
        lastname,
        phone,
        profile_url,
      } = action.payload;

      state.id = id;
      state.username = username;
      state.email = email;
      // state.settings = settings;
      // state.workspaces = workspaces;
      // state.workspaceMember = workspaceMember;
      state.firstname = firstname;
      state.lastname = lastname;
      state.phone = phone;
      state.profile_url = profile_url;
    },
    setProfilePicture: (
      state: userSliceTypes,
      action: {
        payload: {
          url: string;
        };
      }
    ) => {
      state.profile_url = action.payload.url;
    },
    setWorkspaces: (
      state: userSliceTypes,
      action: { payload: Array<workspaceObj> }
    ) => {
      state.allWorkspaces = action.payload;
    },
    addCreatedWorkspace: (
      state: userSliceTypes,
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
    updateWorkspaceName: (
      state: userSliceTypes,
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
      state: userSliceTypes,
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
    addCreatedProjectToWorkspace: (
      state: userSliceTypes,
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
    deleteProjectFromWorkspace: (
      state: userSliceTypes,
      action: {
        payload: {
          wsId: string;
          projectId: string;
          prevWorkspacesData: Array<workspaceObj>;
        };
      }
    ) => {
      const { prevWorkspacesData, projectId, wsId } = action.payload;
      state.allWorkspaces = prevWorkspacesData.map((ws: workspaceObj) => {
        if (ws._id === wsId)
          return {
            ...ws,
            projects: ws.projects.filter(
              (proj: Project) => proj._id !== projectId
            ),
          };

        return ws;
      });
    },
    updateProjectName: (
      state: userSliceTypes,
      action: {
        payload: {
          wsId: string;
          projectId: string;
          updatedProject: Project;
          prevWorkspacesData: Array<workspaceObj>;
        };
      }
    ) => {
      const { wsId, projectId, updatedProject, prevWorkspacesData } =
        action.payload;

      state.allWorkspaces = prevWorkspacesData.map((ws) => {
        if (ws._id === wsId) {
          return {
            ...ws,
            projects: ws.projects.map((proj) => {
              if (proj._id === projectId) return updatedProject;
              return proj;
            }),
          };
        }
        return ws;
      });
    },
  },
});

export default userSlice;
