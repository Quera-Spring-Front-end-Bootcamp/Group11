import apiCall from './axios/instance';

type updateUserBody = {
  username?: string;
  email?: string;
  profile_url?: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
};
const getUserApi = async (userId: string) => {
  return apiCall.get(`users/${userId}`);
};

const updateUserInfoApi = async (userId: string, body: updateUserBody) => {
  return apiCall.put(`users/${userId}`, body);
};

export { updateUserInfoApi, getUserApi };
