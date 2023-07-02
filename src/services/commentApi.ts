import apiCall from './axios/instance';

type createCommentBody = {
  text: string;
  taskId: string;
};

const createCommentApi = async (body: createCommentBody) => {
  return apiCall.post(`comments`, body);
};
const getCommentApi = async (taskId: string) => {
  return apiCall.get(`comments/task/${taskId}`);
};
const deleteCommentApi = async (commentId: string) => {
  return apiCall.delete(`comments/${commentId}`);
};

export { createCommentApi, getCommentApi, deleteCommentApi };
