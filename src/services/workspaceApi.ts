import apiCall from './axios/instance';

const getAllWorkspacesApi = async () => {
  return apiCall.get(`/workspace/get-all`);
};

export { getAllWorkspacesApi };
