import axios from "axios";
import {CookieService} from "./cookie.service";

interface IUserData {
    email: string,
    password: string,
}

export const UserService = {
    async login(email: string, password: string) {
        try {
            const response = await axios.post('/api/login', { email, password });
            CookieService.setAuthToken(response.data.token);
            return response;
        } catch (e) {
            console.log(e);
        }
    },

    async logout() {
        return 'logout'
    }
}
