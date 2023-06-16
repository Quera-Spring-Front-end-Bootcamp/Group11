import apiCall from './axios/instance';

const getAllWorkspacesApi = async () => {
  return apiCall.get(`/workspace/get-all`);
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
export { getAllWorkspacesApi, createWorkSpaceApi, updateWorkspaceApi };
