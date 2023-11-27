import axios from "axios";

export const LogsService = {
    async getAll() {
        return axios.get('/api/logs')
    },

    async getById(id: number) {
        try {
            return axios.get(`/api/logs/${id}`)
        } catch (error){
            console.log(error);
        }
    }
}
