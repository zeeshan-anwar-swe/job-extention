import axiosInstance from '../utils/axiosInstance';

export const getInboxMessages = async () => {
	const response = await axiosInstance.get(`/chat/inbox?limit=4&page=1`);
	console.log({response});
	
	return response.data;
};
