import axios from 'axios';
import toast from 'react-hot-toast';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
	baseURL: apiBaseUrl,
});

// Request interceptor to add the token to every request
axiosInstance.interceptors.request.use(
	async (config) => {
		const token = await localStorage.getItem('token'); // Use localStorage directly (no need for async/await)
		if (token) {
			const parsedToken = await JSON.parse(token);
			config.headers.Authorization = `Bearer ${parsedToken}`;
			 config.headers["ngrok-skip-browser-warning"] = true;
		} else {
			// If there's no token, redirect to login
			toast.error('No token found. Please log in.');
			window.location.href = '/signin';
			return Promise.reject(new Error('No token found'));
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		// Check if the error is due to an expired token (401 Unauthorized)
		if (error.response?.status === 401) {
			// If token is expired, redirect to login
			toast.error('Session expired. Please log in again.');
			localStorage.removeItem('token'); // Remove expired token
			window.location.href = '/signin';
			return Promise.reject(error);
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
