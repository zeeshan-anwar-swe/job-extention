import axiosInstance from '../utils/axiosInstance';

export const getInboxMessages = async () => {
	const response = await axiosInstance.get(`/chat/inbox`);
	return response.data;
};
