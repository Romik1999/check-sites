import axios from "axios";

interface IUserData {
    email: string,
    password: string,
}

export const UserService = {
    async login(email: string, password: string) {
        return await axios.post('/api/login', {email, password})
    },

    async logout() {
        return 'logout'
    }
}
