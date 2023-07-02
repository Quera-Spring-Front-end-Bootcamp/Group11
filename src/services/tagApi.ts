import apiCall from './axios/instance';

type createTagBody = {
  name: string;
  color: string;
  taskId: string;
};

const createTagApi = async (body: createTagBody) => {
  return apiCall.post(`tags`, body);
};
const getTaskTagsApi = async (taskId: string) => {
  return apiCall.get(`tags/task/${taskId}`);
};

const deleteTagApi = async (tagName: string) => {
  return apiCall.delete(`tags/${tagName}`);
};

export { createTagApi, getTaskTagsApi, deleteTagApi };
