import apiCall from './axios/instance';

const getAllProjectBoardsApi = async (projectId: string) => {
  return apiCall.get(`/board/${projectId}`);
};

const changeBoardPositionApi = async (boardId: string, position: number) => {
  return apiCall.put(`/board/${boardId}/position/${position}`);
};
const deleteBoardApi = async (boardId: string) => {
  return apiCall.delete(`/board/${boardId}`);
};
const renameBoardApi = async (boardId: string, name: string) => {
  return apiCall.put(`/board/${boardId}`, { name });
};
export {
  getAllProjectBoardsApi,
  changeBoardPositionApi,
  deleteBoardApi,
  renameBoardApi,
};
