import axiosInstance from "../utils/axiosInstance";

export const getCandidateCV = async (profileId: string) => {
	return await axiosInstance.get(`/linkedin-candidate/resume/${profileId}`, {
		responseType: 'blob',
	});
};
