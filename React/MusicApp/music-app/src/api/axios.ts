import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "@/services/TokenStore";

export const api = axios.create({
  baseURL: "http://localhost:5017/api",
  withCredentials: true, // <— шлём/получаем refresh cookie
});

// добавляем access-token в каждый запрос
api.interceptors.request.use((config) => {
  const t = getAccessToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

// ---- helpers ----
function readAccessFromResponse(data: any): string | null {
  return data?.data?.token ?? data?.data?.Token ?? data?.token ?? data?.Token ?? null;
}

// одна общая попытка рефреша на 401
let refreshPromise: Promise<string> | null = null;

async function doRefresh(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = api.post("/Auth/refresh", {}) // cookie поедет сама
      .then((res) => {
        const newToken = readAccessFromResponse(res.data);
        if (!newToken) throw new Error("No access token in refresh response");
        setAccessToken(newToken);
        return newToken;
      })
      .finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config || {};
    if (error?.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const t = await doRefresh();
        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${t}`;
        return api(original); // повторяем исходный запрос с новым access
      } catch {
        clearAccessToken(); // refresh не сработал — чистим access и пусть UI разлогинит
      }
    }
    return Promise.reject(error);
  }
);