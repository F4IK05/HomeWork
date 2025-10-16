  import axios from "axios";
  import { type UserProfile } from "../types/ProfileData";

  const API_URL = "http://localhost:5017/api/Account";

  export const ProfileService = {
    // 1. Получить профиль пользователя
    async getUserProfile(): Promise<UserProfile> {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Profile loaded:", res.data);
      return res.data;
    },

    // 2. Обновить профиль
    async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_URL}/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Profile updated:", res.data);
      return res.data;
    },

    // 3. Сменить пароль
    async changePassword(oldPassword: string, newPassword: string): Promise<void> {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/security/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Password changed:", res.data);
    },

    // 4. Сменить email
    async changeEmail(newEmail: string, password: string): Promise<void> {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/security/change-email`,
        {
          newEmail,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("📧 Email changed:", res.data);
    },

    // 5. Удалить аккаунт
    async deleteAccount(password: string): Promise<void> {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${API_URL}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { password }, // axios позволяет передавать тело в DELETE
      });

      console.log("🗑️ Account deleted:", res.data);
    },
  };
