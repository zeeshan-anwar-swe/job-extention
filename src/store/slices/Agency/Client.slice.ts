import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';
import toast from 'react-hot-toast';

interface InitialStateType {
	error: null | any;
	clientsList: any[];
	pageLoading: boolean;
	modalLoading: boolean;
	assignedClientWhileCreatingJob: any | null;
}

const initialState: InitialStateType = {
	error: null,
	clientsList: [],
	pageLoading: false,
	modalLoading: false,
	assignedClientWhileCreatingJob: null,
};

export const getClientsList = createAsyncThunk(
	'clients/getClientsList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/agency/clients');
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
		}
	},
);

export const inviteClient = createAsyncThunk(
	'clients/inviteClient',
	async ({ name, email }: { name: string; email: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/client/invite', {
				name,
				email,
			});
			return response.data.data;
		} catch (error: any) {
			// Handle AxiosError specifically
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
		}
	},
);

export const clientsSlice = createSlice({
	name: 'clients',
	initialState,
	reducers: {
		//this action will be used to assign client while creating job at route: /jobs/create-job
		assignClientWhileCreatingJob: (state, action: PayloadAction<any>) => {
			state.assignedClientWhileCreatingJob = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getClientsList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getClientsList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.clientsList = action.payload;
			})
			.addCase(getClientsList.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = new Error(action.error.message);
			})

			.addCase(inviteClient.pending, (state) => {
				state.modalLoading = true;
				state.error = null;
			})
			.addCase(inviteClient.fulfilled, (state) => {
				toast.success('Invitation sent successfully');
				state.modalLoading = false;
			})
			.addCase(inviteClient.rejected, (state, action) => {
				state.modalLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
			});
	},
});

export const { assignClientWhileCreatingJob } = clientsSlice.actions;
export default clientsSlice.reducer;
