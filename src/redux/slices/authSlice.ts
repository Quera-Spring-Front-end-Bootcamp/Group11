import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    page: 'auth',
    username: '',
    email: '',
    settings: [],
  },
  reducers: {
    setPage: (state: any, action) => {
      const { page } = action.payload;
      state.page = page;
    },
    setUserInfo: (state: any, action) => {
      console.log(action);
      const { username, email, settings } = action.payload;
      state.username = username;
      state.email = email;
      state.settings = settings;
    },
  },
});

export default authSlice;
