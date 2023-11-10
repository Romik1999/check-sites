import axios from "axios";

interface IData {
    id: number,
    name: string,
    url: string,
    active: boolean,
}

export const SitesService = {
    async getAll() {
        return axios.get('/api/sites')
    },
    async updateSite(id: number) {
        return axios.get(`/api/sites/update/${id}`)
    }
}
