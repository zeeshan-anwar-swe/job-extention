import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { withAsyncThunkErrorHandler } from '../../utils/withAsyncThunkErrorHandler';
import { searchObjectsByKeyAndValue } from '../../utils/helper';
import {
	ClientDetailsType,
	ClientListItemType,
	TClientWithJobInitialState,
} from '../../types/slices.type/clients.slice.type';

interface InitialStateType {
	error: null | any;
	clentSearch: string;
	search: string;
	clientsList: ClientListItemType[];
	paginatedClients: ClientListItemType[];
	locallySearchedClients: any[];
	paginationCount: number;
	pageLoading: boolean;
	modalLoading: boolean;
	componentLoading: boolean;
	assignedClientWhileCreatingJob: any | null;
	clientDetails: ClientDetailsType | null;
	clientFeedback: any[];
	clientsWithJobs: TClientWithJobInitialState;
}

const initialState: InitialStateType = {
	error: null,
	search: '',
	clentSearch: '',
	paginationCount: 0,
	paginatedClients: [],
	clientFeedback: [],
	clientsList: [],
	pageLoading: false,
	modalLoading: false,
	componentLoading: false,
	locallySearchedClients: [],
	assignedClientWhileCreatingJob: null,
	clientDetails: null,
	clientsWithJobs: { rows: [], count: 0, loading: false, error: null },
};

export const getPaginatedAgencyClientsList = createAsyncThunk(
	'clients/getPaginatedAgencyClientsList',
	async (
		{
			page,
			limit,
			search = '',
			searchBy = '',
		}: { page: number; limit: number; search?: string; searchBy?: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.get(
				`/agency/clients?page=${page}&limit=${limit}&search=${search}${searchBy && `&searchBy=${searchBy}`}`,
			);
			return response.data.data;
		} catch (error: any) {
			return withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getAssignedClientForTeam = createAsyncThunk(
  'clients/getAssignedClientForTeam',
  async (
    {
      page,
      limit,
      search = '',
      searchBy = '',
    }: { page: number; limit: number; search?: string; searchBy?: string },
    { rejectWithValue },
  ) => {
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (search) {
        queryParams.append('search', search);
      }

      if (searchBy) {
        queryParams.append('searchBy', searchBy);
      }

      const response = await axiosInstance.get(`/team/clients?${queryParams.toString()}`);
      return response.data.data;
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

export const getAgencyClientsWithJobs = createAsyncThunk(
	'clients/getAgencyClientsWithJobs',
	async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`agency/client-with-jobs?page=${page}&limit=${limit}`,
			);
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
	'clients/assignJobToClient',
	async ({ assignTo, jobId }: { assignTo: string; jobId?: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/job/assign-client', {
				jobId,
				clientId: assignTo,
			});
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const unAssignJobToClient = createAsyncThunk(
	'clients/unAssignJobToClient',
	async ({ jobId }: { jobId: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/job/unassign-client', {
				jobId,
			});
			toast.success('Job unassigned successfully');
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getClientFeedback = createAsyncThunk(
	'clients/getClientFeedback',
	async (
		{
			page = 1,
			limit = 10,
			search = '',
			period = '',
		}: { page?: number; limit?: number; search?: string; period?: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.get(
				`/feedback/clients?page=${page}&limit=${limit}&search=${search}&period=${period}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const deleteClientClient = createAsyncThunk(
	'clients/deleteClientClient',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(`/client/${id}/delete/`);
			return response.data.data;
		} catch (error: any) {
			return withAsyncThunkErrorHandler(error, rejectWithValue);
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
		setClientSearch: (state, action: PayloadAction<string>) => {
			state.clentSearch = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// .addCase(getAgencyClientsList.pending, (state) => {
			// 	state.pageLoading = true;
			// 	state.error = null;
			// })
			// .addCase(getAgencyClientsList.fulfilled, (state, action) => {
			// 	state.pageLoading = false;
			// 	state.clientsList = action.payload;
			// })
			// .addCase(getAgencyClientsList.rejected, (state, action: any) => {
			// 	state.pageLoading = false;
			// 	state.error = action.payload || {
			// 		message: 'Unknown error occurred while inviting client',
			// 	};
			// 	toast.error(action.payload.message || 'Unknown error');
			// })

			.addCase(getPaginatedAgencyClientsList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getPaginatedAgencyClientsList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.paginatedClients = action.payload.rows;
				state.paginationCount = action.payload.count;
			})
			.addCase(getPaginatedAgencyClientsList.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message || 'Unknown error');
			})


			.addCase(getAssignedClientForTeam.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getAssignedClientForTeam.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.paginatedClients = action.payload.rows;
				state.paginationCount = action.payload.count;
			})
			.addCase(getAssignedClientForTeam.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message || 'Unknown error');
			})

			.addCase(getAgencyClientsWithJobs.pending, (state) => {
				state.clientsWithJobs.loading = true;
				state.clientsWithJobs.error = null;
			})
			.addCase(getAgencyClientsWithJobs.fulfilled, (state, action) => {
				state.clientsWithJobs.rows = action.payload.rows;
				state.clientsWithJobs.count = action.payload.count;
				state.clientsWithJobs.loading = false;
			})
			.addCase(getAgencyClientsWithJobs.rejected, (state, action: any) => {
				state.clientsWithJobs.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message || 'Unknown error');
				state.clientsWithJobs.loading = false;
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
			})

			.addCase(getClientFeedback.pending, (state) => {
				state.error = null;
				state.pageLoading = true;
			})
			.addCase(getClientFeedback.fulfilled, (state, action) => {
				state.clientFeedback = action.payload.rows;
				state.paginationCount = action.payload.count;
				state.pageLoading = false;
			})
			.addCase(getClientFeedback.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message || 'Unknown error occurred while assigning job');
			});
	},
});

export const { assignClientWhileCreatingJob, searchStoredClients, setClientSearch } =
	clientsSlice.actions;
export default clientsSlice.reducer;
