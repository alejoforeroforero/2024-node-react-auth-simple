import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL_BACKEND;

console.log(baseURL)

const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
  // timeout: 5000,
  withCredentials: true, // This is important for sending cookies with requests
});

export const login = (credentials) => axiosInstance.post("/auth/login", credentials);
export const refresh = () => axiosInstance.post("/refresh");
export const verifyAuth = () => axiosInstance.get('auth/verify-auth');
export const verifyRefreshToken = () => axiosInstance.get('auth/refresh-token');

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await refresh();
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Manejar error de refresh (por ejemplo, redirigir a login)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
