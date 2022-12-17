import api from '../../api/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
export interface AuthState {
    user: any;
    isLoading: boolean;
    isAuth: boolean;
}
export interface SignInType {
    email: string;
    password: string;
}
export interface SignUpType {
    name: string;
    email: string;
    password: string;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isAuth: false,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }: SignInType,{rejectWithValue}) => {
    try {
        const res = await api.post('auth/login', { email, password });
        toast('Login Successful', { type: 'success' });
        return res?.data ;
    } catch (error:any) {
        toast(error.response.data.message, { type: 'error' });
        return rejectWithValue(error.response.data.message);
    }
});

export const signUp = createAsyncThunk('auth/signup', async ( signUpData:SignUpType,{rejectWithValue}) => {
    try {
        const res = await api.post('auth/register', signUpData);
        toast('Sign Up Successful', { type: 'success' });
        return res?.data ;
    } catch (error:any) {
        toast(error.response.data.message, { type: 'error' });
        return rejectWithValue(error.response.data.message);
    }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
    try {
        const refreshToken = JSON.parse(localStorage.getItem("loggedInUserInfo") || '{}')?.tokens?.refresh?.token ;
        const res = await api.post('auth/logout', {refreshToken:refreshToken});
        toast('Logout Successful', { type: 'success' });
        return res?.data ;
    } catch (error:any) {
        toast(error.response.data.message, { type: 'error' });
        return error.response.data.message ;
    }
});



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
    extraReducers: (builder) => {
        builder.addCase(login.pending , (state) => {
            state.isLoading = true ;
        })
        .addCase(login.fulfilled , (state,{payload}) => {
            state.isLoading = false ;
            state.isAuth = true ;
            state.user = payload ;
            localStorage.setItem('loggedInUserInfo', JSON.stringify(payload));
        })
        .addCase(login.rejected, (state) => {
            state.isLoading = false ;
            state.isAuth = false ;
        })
        .addCase(signUp.pending , (state) => {
            state.isLoading = true ;
        })
        .addCase(signUp.fulfilled , (state,{payload}) => {
            localStorage.setItem('loggedInUserInfo', JSON.stringify(payload));
            state.isLoading = false ;
            state.isAuth = true ;
            state.user = payload ;
        })
        .addCase(signUp.rejected , (state) => {
            state.isLoading = false ;
            state.isAuth = false ;
            state.user = null ;
        })
        .addCase(logOut.pending , (state) => {
            state.isLoading = true ;
        })
        .addCase(logOut.fulfilled , (state) => {
            state.isLoading = false ;
            state.isAuth = false ;
            state.user = null ;
            localStorage.clear();
        })
        .addCase(logOut.rejected , (state) => {
            state.isLoading = false ;
            state.isAuth = false ;
        })
        
    },
});

export const { authPending, authSuccess, authFail, resetAuth } = authSlice.actions;
export default authSlice.reducer;
