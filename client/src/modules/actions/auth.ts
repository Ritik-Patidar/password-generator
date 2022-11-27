import api from '../../api/config';
import { authPending, authSuccess, authFail } from '../reducers/authReducer';
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
interface SignUpType {
    name: string;
    email: string;
    password: string;
}

export const login = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(authPending());
        try {
            const res = await api.post('auth/login', { email, password });
            localStorage.setItem('loggedInUserInfo', JSON.stringify(res.data));
            dispatch(authSuccess(res.data));
            toast('Login Successful', { type: 'success' });
            return Promise.resolve();
        } catch (err: any) {
            toast(err.response.data.message, { type: 'error' });
            dispatch(authFail());
            return Promise.reject(err.message);
        }
    };
};

export const signUp = (signUpData:SignUpType) => {
    return async (dispatch: AppDispatch) => {
        dispatch(authPending());
        try {
            const res = await api.post('auth/register', signUpData );
            localStorage.setItem('loggedInUserInfo', JSON.stringify(res.data));
            dispatch(authSuccess(res.data));
            toast('Sign Up Successful', { type: 'success' });
            return Promise.resolve();
        } catch (err: any) {
            toast(err.response.data.message, { type: 'error' });
            dispatch(authFail());
            return Promise.reject(err.message);
        }
    };
};
