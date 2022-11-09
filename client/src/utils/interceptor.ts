import api from '../api/config';

export function interceptor() {
    api.interceptors.request.use((request) => {
        const user = localStorage.getItem('loggedInUserInfo') || JSON.stringify({});
        const token = JSON.parse(user)?.token;
        if (token) {
            request.headers = request.headers || {};
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    });
}
