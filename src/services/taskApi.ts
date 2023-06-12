import apiCall from './axios/instance';

const changeTaskBoardApi = async (taskId: string, boardId: string) => {
  return apiCall.put(`/task/${taskId}/board/${boardId}`);
};
const changeTaskPositionApi = async (taskId: string, position: string) => {
  return apiCall.put(`/task/${taskId}/position/${position}`);
};

export { changeTaskBoardApi, changeTaskPositionApi };
