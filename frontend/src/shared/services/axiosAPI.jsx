import axios from "axios";

const BASE_URL = "https://small-ecomm-project.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const accessToken = res.data.accessToken || res.data.data?.accessToken;

        if (!accessToken) {
          throw new Error("Token refresh failed");
        }

        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return API(originalRequest);
      }
      catch (refreshErr) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default API;