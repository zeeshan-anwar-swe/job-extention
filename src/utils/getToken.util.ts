import toast from 'react-hot-toast';

export const getToken = async () => {
	try {
		const token = await localStorage.getItem('token');
		if (!token) {
			toast.error('No token found. Please log in.');
			return null;
		} else {
			const parsedToken = JSON.parse(token);
			return {
				headers: {
					Authorization: `Bearer ${parsedToken}`,
				},
			};
		}
	} catch (error: any) {
		toast.error(error.message);
		return null;
	}
};
