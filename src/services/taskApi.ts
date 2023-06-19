import apiCall from './axios/instance';
type createTaskBody = {
  name: string;
  description: string;
  boardId: string;
};
type updateTaskInfoBody = {
  name: string;
  description: string;
  deadline: string;
};

const changeTaskBoardApi = async (taskId: string, boardId: string) => {
  return apiCall.put(`/task/${taskId}/board/${boardId}`);
};
const changeTaskPositionApi = async (taskId: string, position: string) => {
  return apiCall.put(`/task/${taskId}/position/${position}`);
};
const createTaskApi = async (body: createTaskBody) => {
  return apiCall.post(`task`, body);
};
const deleteTaskApi = async (taskId: string) => {
  return apiCall.delete(`task/${taskId}`);
};
const updateTaskInfoApi = async (taskId: string, body: updateTaskInfoBody) => {
  return apiCall.put(`task/${taskId}`, body);
};
const assigneTaskApi = async (taskId: string, usernameOrId: string) => {
  return apiCall.put(`task/${taskId}/assign/${usernameOrId}`);
};
const unassigneTaskApi = async (taskId: string, usernameOrId: string) => {
  return apiCall.delete(`task/${taskId}/assign/${usernameOrId}`);
};
export {
  changeTaskBoardApi,
  changeTaskPositionApi,
  createTaskApi,
  deleteTaskApi,
  updateTaskInfoApi,
  assigneTaskApi,
  unassigneTaskApi
};
