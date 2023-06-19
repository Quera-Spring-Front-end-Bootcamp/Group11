import apiCall from './axios/instance';

const loginApi = async (emailOrUsername: string, password: string) => {
  return apiCall.post('/auth/login', {
    emailOrUsername,
    password,
  });
};

const registerUserApi = async (body: {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}) => {
  return apiCall.post('/auth/register', body);
};

const forgetPasswordApi = async (email: string) => {
  return apiCall.post('/auth/forget-password', {
    email,
  });
};
const resetPasswordApi = async (password: string, token: string) => {
  return apiCall.post('/auth/reset-password', {
    password,
    token,
  });
};

const getAccessTokenApi = async (rToken: string) => {
  return apiCall.post('/auth/refreshtoken', {
    refreshToken: rToken,
  });
};
export {
  getAccessTokenApi,
  forgetPasswordApi,
  loginApi,
  registerUserApi,
  resetPasswordApi,
};
