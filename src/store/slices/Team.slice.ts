import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { withAsyncThunkErrorHandler } from '../../utils/withAsyncThunkErrorHandler';
import { error } from 'console';
import { TeamMemberType } from '../../types/slices.type/team/team.slice.type';

interface InitialStateType {
	search: string;
	teamList: TeamMemberType[];
	componentLoading: boolean;
	pageLoading: boolean;
	paginationCount: number;
	paginatedList: any[];
	modalLoading: boolean;
	error: null | string | any;
	teamMemberProfile: any | null;
}

const initialState: InitialStateType = {
	search: '',
	teamMemberProfile: null,
	paginatedList: [],
	paginationCount: 0,
	pageLoading: true,
	componentLoading: false,
	modalLoading: false,
	teamList: [],
	error: null,
};

export const getTeamlist = createAsyncThunk('team/getTeamlist', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get('/team/list');
		return response.data.data.rows;
	} catch (error: any) {
		return await withAsyncThunkErrorHandler(error, rejectWithValue);
	}
});

export const deleteTeamMember = createAsyncThunk('team/deleteTeamMember', async ({teamId,agencyId,isDelete}: {teamId:string;agencyId:string;isDelete:boolean}, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.put('/team/delete',{
			teamId,
			
		});
		return response.data.data.rows;
	} catch (error: any) {
		return await withAsyncThunkErrorHandler(error, rejectWithValue);
	}
});

export const getPaginatedTeamlist = createAsyncThunk(
	'team/getPaginatedTeamlist',
	async ({ page, limit, search='' , searchBy='' }: { page: number; limit: number, search?: string , searchBy?: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/team/list?page=${page}&limit=${limit}&search=${search}${searchBy && `&searchBy=${searchBy}`}`);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getTeamMemberDetails = createAsyncThunk(
	'team/getTeamMemberDetails',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/team/statistics/' + id);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const inviteTeamMember = createAsyncThunk(
	'team/inviteTeamMember',
	async (payload: { name: string; email: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/team/invite', payload);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const assignJobToTeamMember = createAsyncThunk(
	'candidates/assignJobToTeamMember',
	async ({ jobId, assignTo }: { jobId: string; assignTo: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/job/assign-team', {
				jobId,
				teamId: assignTo,
			});
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const unAssignJobToTeamMember = createAsyncThunk(
	'candidates/unAssignJobToTeamMember',
	async ({ jobId }: { jobId: string; }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/job/unassign-team', {
				jobId,
			});
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const assignTeamToClient = createAsyncThunk(
	'candidates/assignTeamToClient',
	async ({ clientId, teamId }: { clientId: string; teamId: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/team/assign-client', {
				clientId,
				teamId,
			});
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);



export const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {
		setTeamMemberSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTeamlist.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getTeamlist.fulfilled, (state, action) => {
				state.teamList = action.payload;
				state.pageLoading = false;
			})
			.addCase(getTeamlist.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
			})

			.addCase(getPaginatedTeamlist.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getPaginatedTeamlist.fulfilled, (state, action) => {
				state.paginationCount = action.payload.count;
				state.paginatedList = action.payload.rows;
				state.pageLoading = false;
			})
			.addCase(getPaginatedTeamlist.rejected, (state, action: any) => {
				state.pageLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
			})

			.addCase(inviteTeamMember.pending, (state) => {
				state.modalLoading = true;
				state.error = null;
			})
			.addCase(inviteTeamMember.fulfilled, (state) => {
				state.modalLoading = false;
				toast.success('Invitation sent successfully');
			})
			.addCase(inviteTeamMember.rejected, (state, action: any) => {
				state.modalLoading = false;
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(action.payload.message);
			})

			.addCase(assignJobToTeamMember.pending, (state) => {
				state.error = null;
			})
			.addCase(assignJobToTeamMember.fulfilled, () => {
				toast.success('Job assigned successfully');
			})
			.addCase(assignJobToTeamMember.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(
					action.payload.message || 'Unknown error occurred while inviting client',
				);
			})


			.addCase(assignTeamToClient.pending, (state) => {
				state.error = null;
			})
			.addCase(assignTeamToClient.fulfilled, () => {
				toast.success('Client is assigned successfully');
			})
			.addCase(assignTeamToClient.rejected, ( state,action: any) => {
			
				state.error = null
				toast.error(
					action.payload.message || 'Unknown error occurred while inviting client',
				);
			})


			.addCase(getTeamMemberDetails.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getTeamMemberDetails.fulfilled, (state, action) => {
				state.teamMemberProfile = action.payload;
				state.pageLoading = false;
			})
			.addCase(getTeamMemberDetails.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred while inviting client',
				};
				toast.error(
					action.payload.message || 'Unknown error occurred while inviting client',
				);
			});
	},
});

export const { setTeamMemberSearch } = teamSlice.actions;

export default teamSlice.reducer;
