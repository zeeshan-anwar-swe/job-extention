import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

interface InitialStateType {
	jobsList: any[];
	pageLoading: boolean;
	error: null | any;
}

const initialState: InitialStateType = {
	jobsList: [],
	pageLoading: false,
	error: null,
};

export const getJobsList = createAsyncThunk('jobs/getJobsList', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get('/job/recruiter/list');
		return response.data.data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Failed to change password');
	}
});

export const createJobs = createAsyncThunk(
	'jobs/create',
	async (payload: PayloadAction, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/job', payload);
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
		}
	},
);

export const jobsSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getJobsList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getJobsList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.jobsList = action.payload;
			})
			.addCase(getJobsList.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
			});

		builder
			.addCase(createJobs.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(createJobs.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.jobsList = [...state.jobsList, action.payload];
				toast.success('Job Created');
			})
			.addCase(createJobs.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
				toast.error(action.error.message as string);
				console.error(action.error);
			});
	},
});

export default jobsSlice.reducer;
