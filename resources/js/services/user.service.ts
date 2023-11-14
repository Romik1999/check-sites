import axios from "axios";

interface IUserData {
    email: string,
    password: string,
}

export const UserService = {
    async login(email: string, password: string) {
        try {
            return await axios.post('/api/login', {email, password})
        } catch (e) {
            console.log(e);
        }
    },

    async logout() {
        return 'logout'
    }
}
