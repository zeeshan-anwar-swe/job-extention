import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { withAsyncThunkErrorHandler } from '../../utils/withAsyncThunkErrorHandler';

interface InitialStateType {
	teamList: any[];
	pageLoading: boolean;
	modalLoading: boolean;
	error: null | string | any;
	teamMemberProfile: any | null;
}

const initialState: InitialStateType = {
	teamMemberProfile: null,
	pageLoading: true,
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
export const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {},
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
			.addCase(getTeamlist.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
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
			});
	},
});

export default teamSlice.reducer;
