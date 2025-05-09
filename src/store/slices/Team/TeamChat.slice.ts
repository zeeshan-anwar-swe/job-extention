import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { TeamChatInitialStateType } from '../../../types/slices.type/team/teamChat.slice.type';

const initialState:TeamChatInitialStateType  = {
	recruiterProfile: { loading: false, error: null, data: null },
};

export const getRecruiter = createAsyncThunk(
	'teamChat/getRecruiter',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/team/agency-admin`);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

const teamChatSlice = createSlice({
	name: 'teamChat',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder 
			.addCase(getRecruiter.pending, (state) => {
				state.recruiterProfile.loading = true;
				state.recruiterProfile.error = null;
			})
			.addCase(getRecruiter.fulfilled, (state, action) => {
				state.recruiterProfile = action.payload;
				state.recruiterProfile.loading = false;
			})
			.addCase(getRecruiter.rejected, (state, action: any) => {
				state.recruiterProfile.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.recruiterProfile.loading = false;
			});
	},
});

export default teamChatSlice.reducer;
