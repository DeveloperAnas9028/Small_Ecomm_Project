import axios from "axios";

const BASE_URL="https://small-ecomm-project.onrender.com/api"

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // refreshToken cookie bhejne ke liye
});

// Request Interceptor: Access token attach karne ke liye
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: 401 aane par silent token refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${BASE_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = res.data.data || res.data;
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (refreshErr) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default API;