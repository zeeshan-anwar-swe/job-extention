import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstanceSoft = axios.create({
	baseURL: apiBaseUrl,
});

// Request interceptor to add the token to every request
axiosInstanceSoft.interceptors.request.use(
	async (config) => {
		const token = await localStorage.getItem('token'); // Use localStorage directly (no need for async/await)
		if (token) {
			const parsedToken = await JSON.parse(token);
			config.headers.Authorization = `Bearer ${parsedToken}`;
		} else {
			return Promise.reject(new Error('No token found'));
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor to handle token expiration
axiosInstanceSoft.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response?.status === 401) {
			console.error(error);
			return Promise.reject(error);
		}
		console.error(error);

		return Promise.reject(error);
	},
);

export default axiosInstanceSoft;
