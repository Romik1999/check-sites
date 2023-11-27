import axios from "axios";

export const SettingsService = {
    async getAll() {
        return axios.get('/api/settings')
    },

    async updateSettings(check_enabled, telegram_enabled, telegram_token, telegram_chat_id) {
        try {
            return axios.put('/api/settings', {check_enabled, telegram_enabled, telegram_token, telegram_chat_id})
        } catch (error) {
            console.log(error);
        }
    }
}
