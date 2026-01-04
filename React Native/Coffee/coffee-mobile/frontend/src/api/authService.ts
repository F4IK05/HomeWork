import { api } from "./api";
import { saveTokens, clearTokens } from "./tokenStorage";

export async function register(email: string, password: string, username: string) {
  const { data } = await api.post("/auth/register", { email, password, username });
  await saveTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  await saveTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function me() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function logout() {
  await clearTokens();
}
