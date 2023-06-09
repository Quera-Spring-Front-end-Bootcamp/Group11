import axios from 'axios';
import { getAccessTokenApi } from '../authApi';

const apiCall = axios.create({ baseURL: 'http://localhost:3000/api' });

// Request interceptor for API calls
apiCall.interceptors.request.use(
  async (req) => {
    req.headers['x-auth-token'] = localStorage.getItem('accessToken');
    req.headers['Accept'] = '*/*';

    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
apiCall.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const {
        data: { accessToken },
      } = await getAccessTokenApi(localStorage.getItem('refreshToken') || '');
      axios.defaults.headers.common['x-auth-token'] = accessToken;
      return apiCall(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default apiCall;
