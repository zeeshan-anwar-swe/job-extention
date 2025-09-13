import toast from "react-hot-toast";

export const withAsyncThunkErrorHandler = (error: any, rejectWithValue: any) => {
	if (error.response) {
		toast.error(error.response.data?.message || 'Invitation failed');
		// Server responded with a status code outside 2xx
		return rejectWithValue({
			message: error.response.data?.message || 'Invitation failed',
			status: error.response.status,
			validationErrors: error.response.data?.errors, // If there are validation errors
		});


	} else if (error.request) {
		// Request was made but no response received
		toast.error('No response from server. Please check your connection.');
		return rejectWithValue({
			message: 'No response from server. Please check your connection.',
		});
	} else {
		// Something happened in setting up the request
		toast.error(error.message || 'Failed to send invitation');
		return rejectWithValue({
			message: error.message || 'Failed to send invitation',
		});
	}
};
