import api from '../../api/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface SavePassType {
    site: string;
    username: string;
    password: string;
}

export interface PasswordState {
    isLoading: boolean;
    totalResults: number;
    savedPasswords: {
        site:string;
        username:string;
        userId:string;
        id:string;
    }[];
}

const initialState: PasswordState = {
    isLoading: false,
    totalResults: 0,
    savedPasswords: [],
};

export const savePassword: any = createAsyncThunk(
    'passwords/savePassword',
    async ({ ...passData }: SavePassType, { rejectWithValue }) => {
        try {
            const res = await api.post('passwords', passData);
            toast('Password Saved', { type: 'success' });
            return res?.data;
        } catch (error: any) {
            toast(error.response.data.message, { type: 'error' });
            return rejectWithValue(error.response.data.message);
        }
    },
);

export const updatePassword: any = createAsyncThunk(
    'passwords/updatePassword',
    async ({ data , id }: {data:SavePassType,id:string}, { rejectWithValue }) => {
        try {
            const res = await api.patch(`passwords/${id}`, data);
            toast('Password Updated', { type: 'success' });
            return res?.data;
        } catch (error: any) {
            toast(error.response.data.message, { type: 'error' });
            return rejectWithValue(error.response.data.message);
        }
    },
);

export const getAllSavedPassword: any = createAsyncThunk(
    'passwords/allSavedPassword',
    async ({},{ rejectWithValue }) => {
        try {
            const res = await api.get('passwords');
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    },
);

export const showPassword: any = createAsyncThunk(
    'passwords/showPassword',
    async ({id}:{id:string},{ rejectWithValue }) => {
        try {
            const res = await api.get(`passwords/show-password/${id}`);
            return res?.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    },
);

const authSlice = createSlice({
    name: 'passwords',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSavedPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSavedPassword.rejected, (state) => {
                state.isLoading = initialState.isLoading,
                state.totalResults = initialState.totalResults,
                state.savedPasswords = initialState.savedPasswords
            })
            .addCase(getAllSavedPassword.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.totalResults = payload.totalResults;
                state.savedPasswords = payload.results;
            });
    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
