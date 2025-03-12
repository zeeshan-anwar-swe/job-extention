import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/getToken.util';
import useLocalStorage from '../../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + '/job';

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

export const getJobsList = createAsyncThunk('jobs/getJobsList', async () => {
	const token: any | null = await getToken();
	if (!token) return null;
	const response = await axios.get(apiBaseUrl + '/recruiter/list', token);
	return response.data;
});

export const createJobs = createAsyncThunk('jobs/create', async (payload: PayloadAction) => {
	const token: any | null = await getToken();
	if (!token) return null;
	const response = await axios.post(apiBaseUrl, payload, token);
	return response.data;
});

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
				state.jobsList = action.payload.data;
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
				state.jobsList = [...state.jobsList, action.payload.data];
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
