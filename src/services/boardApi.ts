import apiCall from './axios/instance';

const getAllProjectBoardsApi = async (projectId: string) => {
  return apiCall.get(`/board/${projectId}`);
};

export { getAllProjectBoardsApi };
