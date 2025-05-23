import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from "axios";
import AuthStore from "../stores/AuthStore";



const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.set('Authorization',`Bearer ${token}`);
  }
  return config;
});
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig
    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await AuthStore.refreshToken();
        const newToken = localStorage.getItem("token");

        if (newToken) {
          if (
            originalRequest.headers &&
            typeof originalRequest.headers.set === "function"
          ) {
            originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
          } else {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`,
            } as AxiosRequestHeaders
          }
        }
        return instance(originalRequest);
      } catch (refreshError) {
        AuthStore.logout(); // не получилось обновить — выходим из аккаунта
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
