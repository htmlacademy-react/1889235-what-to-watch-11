import { createAsyncThunk, createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import baseApi from '../api/api';
import { setToken } from '../api/token';
import { RootState } from './store';

export type User = {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: string;
};


export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null
};

export const getUser = createAsyncThunk(
  'login',
  async () => {
    const response = await baseApi.get<User>('/login');
    return response.data;
  });

export const login = createAsyncThunk(
  'login',
  async (loginRequest: LoginRequest) => {
    const response = await baseApi.post<User>('/login', loginRequest);
    setToken(response.data.token);
    return response.data;
  });

export const logout = createAsyncThunk(
  'logout',
  async () => {
    const response = await baseApi.delete<User>('/logout');
    setToken('');
    return response.data;
  });

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
    });
  },
});

const selectSelf = (state: RootState): RootState => state;

export const selectAuthFeature = createDraftSafeSelector(
  selectSelf,
  (state) => state.authStore
);

export const selectUser = createDraftSafeSelector(
  selectAuthFeature,
  (state) => state.user
);

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
