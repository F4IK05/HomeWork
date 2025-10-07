import axios from "axios";
import { jwtDecode } from "jwt-decode";
import i18n from "i18next";

interface DecodedToken {
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  avatarUrl: string;
}

const API_URL = "http://localhost:5017/api";

export const AuthService = {
  // 1. Авторизация
  async login(identifier: string, password: string) {
    const res = await axios.post(`${API_URL}/Auth/login`, {
      Identifier: identifier,
      Password: password,
    });

    const { token, avatarUrl } = res.data.data as LoginResponse;

    console.log("Login response:", res.data);
    console.log("Access token:", res.data.data?.token);

    const decoded = jwtDecode<DecodedToken>(token);

    const name =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const email =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

    console.log("Decoded name:", name);
    console.log("Decoded email:", email);

    console.log("Decoded token:", decoded);

    return {
      token: token,
      name: name,
      email: email,
      avatar: avatarUrl,
    };
  },

  // 2. Проверка верификации
  async checkVerification(token: string) {
    const res = await axios.get(`${API_URL}/Account/VerificationStatus`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.isEmailVerified;
  },

  // 3. Отправка письма подтверждения
  async sendVerificationEmail(token: string) {
    console.log("Sending verification email with token:", token);
    try {
      const lang = i18n.language || "en";
      console.log("Detected language:", lang);

      const res = await axios.post(`${API_URL}/Auth/confirm`, {}, {
        headers: { Authorization: `Bearer ${token}`, "Accept-Language": lang },
      });
      console.log("Email sent successfully:", res.data);
      return res;
    } catch (err: any) {
      console.error("Error sending verification:", err.response?.data || err);
      throw err;
    }
  },

  // 4. Проверка, доступен ли email
  async checkEmail(email: string): Promise<boolean> {
    const res = await axios.get(`${API_URL}/Account/CheckEmail?email=${email}`);
    return res.data;
  },

  // 5. Проверка, доступен ли username
  async checkUsername(username: string): Promise<boolean> {
    const res = await axios.get(`${API_URL}/Account/CheckUser?username=${username}`);
    return res.data;
  },

  // 6. Регистрация нового пользователя
  async register(email: string, username: string, password: string, confirmPassword: string) {
    return axios.post(`${API_URL}/Auth/register`, {
      Email: email,
      UserName: username,
      Password: password,
      ConfirmPassword: confirmPassword,
    });
  },

  // 7. Логин после регистрации
  async loginAfterRegister(username: string, password: string) {
    const res = await axios.post(`${API_URL}/Auth/login`, {
      Identifier: username,
      Password: password,
    });

    const { token, avatarUrl } = res.data.data;
    const decoded = jwtDecode<DecodedToken>(token);

    const name =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const email =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

    return { token: token, name: name, email: email, avatar: avatarUrl };
  },

  // 8. Повторная отправка подтверждения
  // async sendVerification(token: string) {
  //   console.log("Token before sending verification:", token);
  //   return axios.post(`${API_URL}/Auth/confirm`, {}, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  // },

  // 9. Регистрация через Google
  async googleRegister(payload: any) {
    return axios.post(`${API_URL}/Auth/google/register`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  },

  // 10. Редирект на Google OAuth
  redirectToGoogle() {
    window.location.href = `${API_URL}/Auth/google/login`;
  },
};
