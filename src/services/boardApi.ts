import apiCall from './axios/instance';

const getAllProjectBoardsApi = async (projectId: string) => {
  return apiCall.get(`/board/${projectId}`);
};

const changeBoardPositionApi = async (boardId: string, position: number) => {
  return apiCall.put(`/board/${boardId}/position/${position}`);
};

export { getAllProjectBoardsApi, changeBoardPositionApi };
