import axios from "axios";
import {CookieService} from "./cookie.service";

interface IUserData {
    email: string,
    password: string,
}

const API_URL = '/api';

export const UserService = {
    async login(email: string, password: string) {
        try {
            const response = await axios.post('/api/login', { email, password });
            const token = response.data.token;
            CookieService.setCookie('laravel_token', token, 7);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return response;
        } catch (error) {
            console.log('Ошибка входа:', error);
        }
    },

    checkAuth () {
        const token = CookieService.getCookie('laravel_token'); // Загрузить токен из кук
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Установить заголовок авторизации для будущих запросов
            return token
        }
    },

    async logout() {
        try {
            await axios.post('/api/logout');
            delete axios.defaults.headers.common['Authorization'];
            return true;
        } catch (error) {
            console.error('Ошибка выхода:', error);
            return false;
        }
    }
}
