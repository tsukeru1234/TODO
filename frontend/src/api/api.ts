import axios, { type AxiosInstance } from "axios";
import { accessToken } from "../util/store";
import { getDefaultStore } from "jotai";

const store = getDefaultStore();

export const api: AxiosInstance = axios.create({
  // ? базовая настройка axios
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
//? acc/token/ получить токен, туда отправляют поcт запрос с логином и паролем
//? acc/token/refresh/ для рефреш токена

const refreshApi: AxiosInstance = axios.create({
  // ? для рефреша токена
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  // ? перед отправкой запроса проверка на аксес токен
  (config) => {
    const token = store.get(accessToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  // ? перед получением ответа проверка на действенность токена
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await refreshApi.post("acc/token/refresh/");

        const newAccessToken = res.data.access;
        store.set(accessToken, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.set(accessToken, null);
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
