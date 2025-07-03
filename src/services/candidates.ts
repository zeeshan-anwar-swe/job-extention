import axiosInstance from "../utils/axiosInstance";

export const getCandidateCV = async (profileId: string) => {
	return await axiosInstance.get(`/candidate/resume/${profileId}`, {
		responseType: 'blob',
	});
};
