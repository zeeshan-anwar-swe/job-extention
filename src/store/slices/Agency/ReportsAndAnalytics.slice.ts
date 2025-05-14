import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { reportsAndAnalyticsInitialStateType } from '../../../types/slices.type/agency/reportsAndAnalytics.slice.type';
import { TPeriod, TPeriods } from '../../../constants/periods.constant';

const initialState: reportsAndAnalyticsInitialStateType = {
	clientMetrics: { loading: true, error: null, count: 0, rows: [] },
	teamPerformance: { loading: true, error: null, count: 0, rows: [] },
	chartData: { loading: true, error: null, data: [] },
	statics: {
		loading: true,
		error: null,
		data: { jobsApplied: 0, rejectedJobs: 0, totalHirings: 0, pendingJobs: 0 },
	},
};

export const getClientsMetrics = createAsyncThunk(
	'reportsAndAnalytics/getClientsMetrics',
	async ({ limit, page }: { limit: number; page: number }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/agency/client-hiring-rates?page=${page}&limit=${limit}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getTeamPerformance = createAsyncThunk(
	'reportsAndAnalytics/getTeamPerformance',
	async ({ limit, page }: { limit: number; page: number }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/team/jobs-closed-percentage?page=${page}&limit=${limit}`,
			);
			
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getStatics = createAsyncThunk(
	'reportsAndAnalytics/getStatics',
	async (
		{ period, startDate, endDate }: { period: string; startDate: string; endDate: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.get(
				`/agency/performance-statistics?period=${period}&startDate=${startDate}&endDate=${endDate}`,
			);
			return response.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getReportsAndAnalyticsChartData = createAsyncThunk(
	'reportsAndAnalytics/getReportsAndAnalyticsChartData',
	async (
		{ period, startDate, endDate }: { period: string; startDate: string; endDate: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.get(
				`/agency/performance-metrics?period=${period}&startDate=${startDate}&endDate=${endDate}`,
			);
			return response.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

const reportsAndAnalyticsSlice = createSlice({
	name: 'reportsAndAnalytics',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getClientsMetrics.pending, (state) => {
				state.clientMetrics.loading = true;
				state.clientMetrics.error = null;
			})
			.addCase(getClientsMetrics.fulfilled, (state, action) => {
				state.clientMetrics.rows = action.payload.rows;
				state.clientMetrics.count = action.payload.count;
				state.clientMetrics.loading = false;
			})
			.addCase(getClientsMetrics.rejected, (state, action: any) => {
				state.clientMetrics.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.clientMetrics.loading = false;
			});

		builder
			.addCase(getTeamPerformance.pending, (state) => {
				state.teamPerformance.loading = true;
				state.teamPerformance.error = null;
			})
			.addCase(getTeamPerformance.fulfilled, (state, action) => {
				state.teamPerformance.rows = action.payload.rows;
				state.teamPerformance.count = action.payload.count;
				state.teamPerformance.loading = false;
			})
			.addCase(getTeamPerformance.rejected, (state, action: any) => {
				state.teamPerformance.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.teamPerformance.loading = false;
			});


			builder
			.addCase(getReportsAndAnalyticsChartData.pending, (state) => {
				state.chartData.loading = true;
				state.chartData.error = null;
			})
			.addCase(getReportsAndAnalyticsChartData.fulfilled, (state, action) => {
				state.chartData = action.payload;
				state.chartData.loading = false;
			})
			.addCase(getReportsAndAnalyticsChartData.rejected, (state, action: any) => {
				state.chartData.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.chartData.loading = false;
			});


			builder
			.addCase(getStatics.pending, (state) => {
				state.statics.loading = true;
				state.statics.error = null;
			})
			.addCase(getStatics.fulfilled, (state, action) => {
				state.statics = action.payload;
				state.statics.loading = false;
			})
			.addCase(getStatics.rejected, (state, action: any) => {
				state.statics.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.statics.loading = false;
			});


			
	},
});

export default reportsAndAnalyticsSlice.reducer;
