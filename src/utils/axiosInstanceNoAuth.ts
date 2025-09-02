import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
	baseURL: apiBaseUrl,
});

axiosInstance.interceptors.request.use(
	async (config) => {
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
