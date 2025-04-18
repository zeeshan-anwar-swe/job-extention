import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { searchObjectsByKeyAndValue } from '../../../utils/helper';
import {
	ClientDetailsType,
	ClientListItemType,
} from '../../../types/slices.type/clients.slice.type';

interface InitialStateType {
	error: null | any;
	clientsList: ClientListItemType[];
	locallySearchedClients: any[];
	pageLoading: boolean;
	modalLoading: boolean;
	assignedClientWhileCreatingJob: any | null;
	clientDetails: ClientDetailsType | null;
}

const initialState: InitialStateType = {
	error: null,
	clientsList: [],
	pageLoading: false,
	modalLoading: false,
	locallySearchedClients: [],
	assignedClientWhileCreatingJob: null,
	clientDetails: null,
};

export const getAgencyClientsList = createAsyncThunk(
	'clients/getAgencyClientsList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/agency/clients');
			return response.data.data.rows;
		} catch (error: any) {
			return withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getClientDetails = createAsyncThunk(
	'clients/getClientDetails',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/client/detail/' + id);
			return response.data.data;
		} catch (error: any) {
			return withAsyncThunkErrorHandler(error, rejectWithValue);
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
			toast.error(error?.response?.data?.message || 'Invitation failed');
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const assignJobToClient = createAsyncThunk(
	'jobs/assignJobToClient',
	async ({ clientId, jobId }: { clientId: string; jobId?: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/job/assign-client', {
				jobId,
				clientId,
			});
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
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
		searchStoredClients: (state, action: PayloadAction<string>) => {
			state.locallySearchedClients = searchObjectsByKeyAndValue({
				list: state.clientsList,
				key: 'name',
				value: action.payload,
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAgencyClientsList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getAgencyClientsList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.clientsList = action.payload;
			})
			.addCase(getAgencyClientsList.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message || 'Unknown error');
			})

			.addCase(getClientDetails.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getClientDetails.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.clientDetails = action.payload;
			})
			.addCase(getClientDetails.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message || 'Unknown error');
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
			})

			.addCase(assignJobToClient.pending, (state) => {
				state.error = null;
			})
			.addCase(assignJobToClient.fulfilled, () => {
				toast.success('Job assigned successfully');
			})
			.addCase(assignJobToClient.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message || 'Unknown error occurred while assigning job');
			});
	},
});

export const { assignClientWhileCreatingJob, searchStoredClients } = clientsSlice.actions;
export default clientsSlice.reducer;
