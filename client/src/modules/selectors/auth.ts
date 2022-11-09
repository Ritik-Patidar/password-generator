import { RootState } from '../reducers';

export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getAuthUser = (state: RootState) => state.auth.user;
export const isAuthLoading = (state: RootState) => state.auth.isLoading;
export const getAuthToken = (state: RootState) => state.auth.user.token;
export const getAuthUserId = (state: RootState) => state.auth.user.userId;
