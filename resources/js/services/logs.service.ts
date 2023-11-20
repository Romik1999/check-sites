import axios from "axios";

export const LogsService = {
    async getAll() {
        return axios.get('/api/logs')
    }
}
