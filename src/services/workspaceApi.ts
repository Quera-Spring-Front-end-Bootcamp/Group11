import apiCall from './axios/instance';

const getAllWorkspacesApi = async () => {
  return apiCall.get(`/workspace/get-all`);
};
const createWorkSpaceApi = async (body: { name: string }) => {
  return apiCall.post(`/workspace/create`, body);
};
export { getAllWorkspacesApi, createWorkSpaceApi };
