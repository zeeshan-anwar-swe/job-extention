import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

interface InitialStateType {
	teamList: any[];
	pageLoading: boolean;
	error: null | any;
	teamMemberProfile: any | null;
}

const initialState: InitialStateType = {
	teamMemberProfile: null,
	pageLoading: false,
	teamList: [],
	error: null,
};

export const getTeamlist = createAsyncThunk(
	'team/inviteTeamMember',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/team/list');
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
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
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
		}
	},
);
export const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(inviteTeamMember.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(inviteTeamMember.fulfilled, (state) => {
				state.pageLoading = false;
				toast.success('Invitation sent successfully');
			})
			.addCase(inviteTeamMember.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
			});
	},
});

export default teamSlice.reducer;
