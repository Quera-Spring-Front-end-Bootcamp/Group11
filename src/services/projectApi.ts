import apiCall from './axios/instance';

const getProjectByIdApi = async (projectId: string) => {
  return apiCall.get(`projects/${projectId}`);
};
const createProjectApi = async (name: string, workspaceId: string) => {
  return apiCall.post(`projects`, { name, workspaceId });
};
const shareProjectApi = async (projectId: string, usernameOrId: string) => {
  return apiCall.put(`/projects/${projectId}/members/${usernameOrId}`);
};

export { getProjectByIdApi, createProjectApi, shareProjectApi };
