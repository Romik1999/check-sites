import axios from "axios";
import {CookieService} from "./cookie.service";

interface IData {
    id: number,
    name: string,
    url: string,
    active: boolean,
}

export const SitesService = {
    async getAll() {
        try {
            return await axios.get('/api/sites')
        } catch (error) {
            console.log(error);
        }
    },

    async createSite(url: string, active: boolean) {
        try {
            return axios.post(`/api/sites`, {url, active})
        } catch (error) {
            console.log(error);
        }
    },

    async updateSite(siteId: number, url: string, active: number) {
        try {
            return axios.put(`/api/sites/${siteId}`, {url, active})
        } catch (error) {
            console.log(error);
        }
    },

    async deleteSite(id: number) {
        return axios.delete(`/api/sites/${id}`)
    }
}
