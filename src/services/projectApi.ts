import apiCall from './axios/instance';

const getProjectByIdApi = async (projectId: string) => {
  return apiCall.get(`projects/${projectId}`);
};

export { getProjectByIdApi };
