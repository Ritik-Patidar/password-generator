import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    user: any;
    isLoading: boolean;
    isAuth: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: () => ({
            ...initialState,
        }),
        authPending: (state) => ({
            ...state,
            isLoading: true,
        }),
        authSuccess: (state, { payload }) => ({
            ...state,
            isLoading: false,
            user: payload,
            isAuth: true,
        }),
        authFail: (state) => ({
            ...state,
            ...initialState,
        }),
    },
});

export const { authPending, authSuccess, authFail, resetAuth } = authSlice.actions;
export default authSlice.reducer;
