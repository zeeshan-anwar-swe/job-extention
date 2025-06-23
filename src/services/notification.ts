import axiosInstance from '../utils/axiosInstance';

export const getNotifications = async () => {
	const response = await axiosInstance.get(`/notification/me`);
	return response.data;
};
