import { api } from "@/api/axios";
import { type UserProfile } from "../types/ProfileData";

const BASE = "/Account";
export const ProfileService = {
  // 1. Получить профиль пользователя
  async getUserProfile(): Promise<UserProfile> {
    const res = await api.get(`${BASE}/me`);
    console.log("Profile loaded:", res.data);
    return res.data;
  },

  // 2. Обновить профиль
  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const res = await api.put(`${BASE}/update`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Profile updated:", res.data);
    return res.data;
  },

  // 3. Сменить пароль
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const res = await api.post( `${BASE}/security/change-password`,
      { oldPassword, newPassword },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Password changed:", res.data);
  },

  // 4. Сменить email
  async changeEmail(newEmail: string, password: string): Promise<void> {
    const res = await api.post( `${BASE}/security/change-email`,
      { newEmail, password },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Email changed:", res.data);
  },

  // 5. Удалить аккаунт
  async deleteAccount(password: string): Promise<void> {
    const res = await api.delete(`${BASE}/delete`, {
      headers: { "Content-Type": "application/json"},
      data: { password }, // axios позволяет передавать тело в DELETE
    });
    console.log("Account deleted:", res.data);
  },
};