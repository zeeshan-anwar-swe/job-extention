import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZjM3ODI5OS0wNTRjLTQ3MjktYTRmZi00MTIwYzBiNTBhNjgiLCJlbWFpbCI6Im11c21hbmdoYW5pMjAwMCthZ2VuY3kxQGdtYWlsLmNvbSIsInJvbGUiOiJBZ2VuY3lBZG1pbiIsInRva2VuVmVyc2lvbiI6MTcsImlhdCI6MTc1ODAyNzIyNywiZXhwIjoxNzU4MTEzNjI3fQ.yl4nRjZITMemMl_VIt9Lnssys0tL_26p728DGU9HQNM";
	config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
