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

    async updateSite(id: number, active: number) {
        return axios.patch(`/api/sites/${id}`, {active})
    },

    async deleteSite(id: number) {
        return axios.delete(`/api/sites/${id}`)
    }
}
