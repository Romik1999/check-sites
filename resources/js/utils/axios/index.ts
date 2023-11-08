import axios from "axios";

export const instance = axios.create({
    baseURL: '/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
