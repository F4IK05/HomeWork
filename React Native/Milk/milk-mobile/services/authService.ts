import api from "./api";

export const AuthService = {
    async register(data: any) {
        const response = await api.post('Auth/register', data);
        return response.data;
    },

    async login(data: any) {
        const response = await api.post('Auth/login', data);
        return response.data;
    },

    async getMe() {
        const response = await api.get('/Auth/me');
        return response.data;
    },

    async checkEmail(email: string) {
        const response = await api.get('Auth/check-email', {
            params: { email }
        });
        return response.data;
    }
}