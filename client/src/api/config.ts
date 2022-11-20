// const BASE_ENDPOINT = process.env.REACT_APP_API_BASE_URL;

// export const ENDPOINT_DEV = `${BASE_ENDPOINT}/api/v1/`;
// export const ORG_ID = 'sharedstudios_dev';

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5555/v1/',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

export default instance;
