import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    username: '',
    email: '',
    settings: [],
  },
  reducers: {
    setPage: (state: any, action) => {
      const { page } = action.payload;
      state.page = page;
    },
    setUserInfo: (
      state: any,
      action: {
        payload: {
          username: string;
          email: string;
          settings?: string;
          id: string;
        };
      }
    ) => {
      const { username, email, settings, id } = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
      state.settings = settings;
    },
  },
});

export default userSlice;
