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

    async createSite(name: string, url: string, active: boolean) {
        return axios.post(`/api/sites`, {name, url, active})
    },

    async updateSite(id: number) {
        return axios.get(`/api/sites/update/${id}`)
    },

    async deleteSite(id: number) {
        return axios.delete(`/api/sites/${id}`)
    }
}
