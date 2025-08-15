import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';

interface adminCredentialType {
	value: number;
	change: string;
}

interface adminStatisticsType {
	jobsPosted: adminCredentialType;
	successJobs: adminCredentialType;
	newRecruiters: adminCredentialType;
	newClients: adminCredentialType;
}

interface InitialStateType {
	adminStatistics: adminStatisticsType;
	error: null | Error;
	pageLoading: boolean;
	chartData: any[];
}

const initialState: InitialStateType = {
	error: null,
	adminStatistics: {
		jobsPosted: {
			value: 0,
			change: '',
		},
		successJobs: {
			value: 0,
			change: '',
		},
		newRecruiters: {
			value: 0,
			change: '',
		},
		newClients: {
			value: 0,
			change: '',
		},
	},
	pageLoading: false,
	chartData: [],
};

export const getAdminStatics = createAsyncThunk(
	'adminStatics/getAdminStatics',
	async (
		{ startDate, endDate, period }: { startDate: string; endDate: string; period: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.get(
				`/admin/dashboard?startDate=${startDate}&endDate=${endDate}&period=${period}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const adminStaticsSlice = createSlice({
	name: 'adminStatics',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAdminStatics.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getAdminStatics.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.adminStatistics = action.payload;
			})
			.addCase(getAdminStatics.rejected, (state, action: any) => {
				state.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.pageLoading = false;
			});
	},
});

export default adminStaticsSlice.reducer;
