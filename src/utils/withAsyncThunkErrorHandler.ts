export const withAsyncThunkErrorHandler = (error: any, rejectWithValue: any) => {
	if (error.response) {
		// Server responded with a status code outside 2xx
		return rejectWithValue({
			message: error.response.data?.message || 'Invitation failed',
			status: error.response.status,
			validationErrors: error.response.data?.errors, // If there are validation errors
		});
	} else if (error.request) {
		// Request was made but no response received
		return rejectWithValue({
			message: 'No response from server. Please check your connection.',
		});
	} else {
		// Something happened in setting up the request
		return rejectWithValue({
			message: error.message || 'Failed to send invitation',
		});
	}
};
