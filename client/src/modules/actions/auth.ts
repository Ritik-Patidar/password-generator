import api from '../../api/config';
import { authPending, authSuccess, authFail } from '../reducers/authReducer';
import { AppDispatch } from '../store';

export const login = (email: string, password: string, remember: boolean) => {
    return async (dispatch: AppDispatch) => {
        dispatch(authPending());
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     // withCredentials: true,
            // };
            const res = await api.post('users/login', { email, password, remember });
            if (res.data.code === 200) {
                const user = res.data.data;
                localStorage.setItem('loggedInUserInfo', JSON.stringify(user));
                dispatch(authSuccess(user));
                return Promise.resolve();
            } else if (res.data.code === 400) {
                dispatch(authFail());
                return Promise.reject(res.data.data.errMsg);
            }
        } catch (err: any) {
            dispatch(authFail());
            return Promise.reject(err.message);
        }
    };
};
