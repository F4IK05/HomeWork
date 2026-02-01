import api from "./api";

export interface UpdateProfileRequest {
    name: string;
    surname: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export const profileService = {
    async getProfile() {
        const response = await api.get('/Profile/me');
        return response.data;
    },

    async updateProfile(data: UpdateProfileRequest) {
        const response = await api.put('/Profile/update-profile', data);
        return response.data;
    },

    async updateAvatar(avatarUrl: string) {
        const response = await api.put('/Profile/update-avatar', { avatarUrl });
        return response.data;
    },

    async changePassword(data: ChangePasswordRequest) {
        const response = await api.put('/Profile/change-password', data);
        return response.data; // Вернет { message: "Password changed" }
    }
} 