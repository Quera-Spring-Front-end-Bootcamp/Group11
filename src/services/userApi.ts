import apiCall from './axios/instance';

const updateUserInfoApi = async (userId: string, body: any) => {
  return apiCall.put(`users/${userId}`, body);
};

export { updateUserInfoApi };
