import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';

interface IAgencyStatistics {
	jobs: number;
	shortListedCandidates: number;
	inInterview: number;
	hiredCandidates: number;
}

interface InitialStateType {
	error: null | string;
	agencyStatistics: IAgencyStatistics;
	pageLoading: boolean;
	modalLoading: boolean;
	assignedClientWhileCreatingJob: any | null;
}

const initialState: InitialStateType = {
	error: null,
	agencyStatistics: {
		jobs: 0,
		shortListedCandidates: 0,
		inInterview: 0,
		hiredCandidates: 0,
	},
	pageLoading: false,
	modalLoading: false,
	assignedClientWhileCreatingJob: null,
};

export const getAgencyStatics = createAsyncThunk(
	'agencyStatics/getAgencyStatics',
	async (
		{ startDate, endDate, period }: { startDate: string; endDate: string; period: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.get(
				`/agency/dashboard?startDate=${startDate}&endDate=${endDate}&period=${period}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const agencyStaticsSlice = createSlice({
	name: 'agencyStatics',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAgencyStatics.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getAgencyStatics.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.agencyStatistics = action.payload;
			})
			.addCase(getAgencyStatics.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
			});
	},
});

export default agencyStaticsSlice.reducer;
