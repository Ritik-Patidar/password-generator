import api from '../api/config';
import { tokenService } from './token.service';
import history from './history' ;
import { RoutePaths } from '../modules/consts/enum';

export function interceptor() {
    api.interceptors.request.use((request) => {
        const token = tokenService.getLocalAccessToken();
        if (token) {
            request.headers = request.headers || {};
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalConfig = error.config;
            const refreshToken = tokenService.getLocalRefreshToken();
            if (
                refreshToken &&
                error?.response?.data?.code === 401 &&
                originalConfig._retry !== true &&
                originalConfig.url !== '/auth/refresh-tokens'
            ) {
                originalConfig._retry = true;
                try {
                    const res = await api.post('/auth/refresh-tokens', { refreshToken });
                    tokenService.updateToken(res.data);
                    return api(originalConfig);
                } catch (err) {
                    tokenService.removeUser();
                    history.replace(RoutePaths.Login);
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        },
    );
}
