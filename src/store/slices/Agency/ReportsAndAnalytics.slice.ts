import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { reportsAndAnalyticsInitialStateType } from '../../../types/slices.type/agency/reportsAndAnalytics.slice.type';

const initialState: reportsAndAnalyticsInitialStateType = {
	clientMetrics: { loading: true, error: null, count: 0, rows: [] },
	teamPerformance: { loading: true, error: null, count: 0, rows: [] },
};

export const getClientsMetrics = createAsyncThunk(
	'reportsAndAnalytics/getClientsMetrics',
	async ({ limit, page }: { limit: number; page: number }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(
				`/agency/client-hiring-rates?page=${page}&limit=${limit}`,
			);
			return response.data;
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
				`/agency/client-hiring-rates?page=${page}&limit=${limit}`,
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
	},
});

export default reportsAndAnalyticsSlice.reducer;
