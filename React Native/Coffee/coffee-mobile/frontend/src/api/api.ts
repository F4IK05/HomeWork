import axios from "axios";
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "./tokenStorage";

export const api = axios.create({
  baseURL: "http://10.0.2.2:5147",
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

function resolveQueue(token: string | null) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // если не 401 - отдаём ошибку
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    // если уже идёт refresh - ждём
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push((token) => {
          if (!token) return reject(error);
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token");

      const resp = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
        refreshToken,
      });

      const newAccess = resp.data.accessToken;
      const newRefresh = resp.data.refreshToken;

      await saveTokens(newAccess, newRefresh);

      resolveQueue(newAccess);

      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    } catch (e) {
      resolveQueue(null);
      await clearTokens();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
