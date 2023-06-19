import apiCall from './axios/instance';

const getAllWorkspacesApi = async () => {
  return apiCall.get(`/workspace/get-all`);
};

const getWorkspacesByIdApi = async (wsId: string) => {
  return apiCall.get(`/workspace/${wsId}`);
};

const createWorkSpaceApi = async (body: { name: string }) => {
  return apiCall.post(`/workspace/create`, body);
};

const updateWorkspaceApi = async (
  id: string,
  body: {
    name: string;
    usernameOrId: string;
    image: string;
  }
) => {
  return apiCall.patch(`/workspace/${id}`, body);
};

const addMemberToWorkspaceApi = async (username: string, wsId: string) => {
  return apiCall.put(`/workspace/${wsId}/members/${username}`);
};

const deleteWorkspaceApi = async (wsId: string) => {
  return apiCall.delete(`/workspace/${wsId}`);
};

export {
  getAllWorkspacesApi,
  createWorkSpaceApi,
  updateWorkspaceApi,
  getWorkspacesByIdApi,
  addMemberToWorkspaceApi,
  deleteWorkspaceApi,
};
