import axios from "axios";

interface IData {
    id: number,
    name: string,
    url: string,
    active: boolean,
}

export const sitesService = {
    async getAll() {
        return axios.get<IData[]>('/api/sites')
    },
    async updateSite(id: number) {
        return axios.get(`/api/sites/update/${id}`)
    }
}
