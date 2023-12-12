import axios from "axios";
import {CookieService} from "./cookie.service";
import {Site} from "../common/types/site";

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

    async updateSite({id, url, active}: Site) {
        try {
            return axios.put(`/api/sites/${id}`, {url, active: active ? 1 : 0})
        } catch (error) {
            console.log(error);
        }
    },

    async deleteSite(id: number) {
        return axios.delete(`/api/sites/${id}`)
    }
}
