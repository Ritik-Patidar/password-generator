import api from '../../api/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface PasswordState {
    isLoading: boolean;
}
export interface SavePassType {
    site: string;
    username: string;
    password: string;
}

const initialState: PasswordState = {
    isLoading: false,
};

export const savePassword: any = createAsyncThunk('passwords/savePassword', async ({...passData}:SavePassType,{rejectWithValue}) => {
    try {
        const res = await api.post('passwords',passData);
        toast('Password Saved', { type: 'success' });
        return res?.data ;
    } catch (error:any) {
        toast(error.response.data.message, { type: 'error' });
        return rejectWithValue(error.response.data.message);
    }
});


const authSlice = createSlice({
    name: 'passwords',
    initialState,
    reducers: {
    },
});

export const { } = authSlice.actions;
export default authSlice.reducer;
