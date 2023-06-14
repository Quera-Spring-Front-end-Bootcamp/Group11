import apiCall from './axios/instance';

const getProjectByIdApi = async (projectId: string) => {
  return apiCall.get(`projects/${projectId}`);
};
const createProjectApi = async (name: string, workspaceId: string) => {
  return apiCall.post(`projects`, { name, workspaceId });
};

export { getProjectByIdApi, createProjectApi };
