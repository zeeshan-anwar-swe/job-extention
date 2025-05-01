import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { TaskBoardInitialStateType } from '../../../types/slices.type/agency/taskboard.slice.type';

const initialState: TaskBoardInitialStateType = {
	error: null,
	taskBoardData: {
		backlogJobs: [],
		inProgressJobs: [],
		inReviewJobs: [],
		completedJobs: [],
	},
	pageLoading: false,
	modalLoading: false,
	componentLoading: false,
};

export const getTaskBoardData = createAsyncThunk(
	'taskBoard/getTaskBoardData',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/agency/taskboard`);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const taskBoardSlice = createSlice({
	name: 'taskBoard',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTaskBoardData.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getTaskBoardData.fulfilled, (state, action) => {
				state.taskBoardData = action.payload;
				state.pageLoading = false;
			})
			.addCase(getTaskBoardData.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.pageLoading = false;
			});
	},
});

export default taskBoardSlice.reducer;
