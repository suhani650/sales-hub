import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // send the httpOnly refresh cookie
});

let accessToken = null;
export function setAccessToken(token) {
  accessToken = token;
}

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// If a request fails with 401, try refreshing the access token once, then retry.
let refreshPromise = null;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        refreshPromise ??= api.post("/auth/refresh").then((r) => r.data.accessToken);
        const newToken = await refreshPromise;
        refreshPromise = null;
        setAccessToken(newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (e) {
        refreshPromise = null;
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
