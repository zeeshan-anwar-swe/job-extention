import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';

interface AgencyCredentialType {
    count: number;
    change: number;
}

interface IAgencyStatistics {
    jobs: AgencyCredentialType;
    shortListedCandidates: AgencyCredentialType;
    inInterview: AgencyCredentialType;
    hiredCandidates: AgencyCredentialType;
}

interface InitialStateType {
    error: null | Error;
    agencyStatistics: IAgencyStatistics;
    pageLoading: boolean;
    modalLoading: boolean;
    componentLoading: boolean;
    assignedClientWhileCreatingJob: any | null;
    chartData: any[];
    chartCategory: string[];
}

const initialState: InitialStateType = {
    error: null,
    agencyStatistics: {
        jobs: {
            count: 0,
            change: 0,
        },
        shortListedCandidates: {
            count: 0,
            change: 0,
        },
        inInterview: {
            count: 0,
            change: 0,
        },
        hiredCandidates: {
            count: 0,
            change: 0,
        },
    },
    chartCategory: [],
    chartData: [],
    pageLoading: false,
    modalLoading: false,
    componentLoading: false,
    assignedClientWhileCreatingJob: null,
};

export const getTeamStatics = createAsyncThunk(
    'teamDashboard/getTeamStatics',
    async (
        { startDate, endDate, period }: { startDate: string; endDate: string; period: string },
        { rejectWithValue },
    ) => {
        try {
            const response = await axiosInstance.get(
                `/team/dashboard?startDate=${startDate}&endDate=${endDate}&period=${period}`,
            );
            return response.data.data;
        } catch (error: any) {
            return await withAsyncThunkErrorHandler(error, rejectWithValue);
        }
    },
);

export const getChartData = createAsyncThunk(
    'teamDashboard/getChartData',
    async ({ period, startDate, endDate }: { period: string; startDate: string; endDate: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/agency/dashboard-metrics?period=${period}&startDate=${startDate}&endDate=${endDate}`);
            return response.data.data;
        } catch (error: any) {
            return await withAsyncThunkErrorHandler(error, rejectWithValue);
        }
    },
);

export const teamDashboardSlice = createSlice({
    name: 'teamDashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTeamStatics.pending, (state) => {
                state.pageLoading = true;
                state.error = null;
            })
            .addCase(getTeamStatics.fulfilled, (state, action) => {
                state.pageLoading = false;
                state.agencyStatistics = action.payload;
            })
            .addCase(getTeamStatics.rejected, (state, action: any) => {
                state.error = action.payload || {
                    message: 'Unknown error occurred ',
                };
                toast.error((action.payload.message as string) || 'Unknown error occurred ');
                state.pageLoading = false;
            });

        builder
            .addCase(getChartData.pending, (state) => {
                state.componentLoading = true;
                state.error = null;
            })
            .addCase(getChartData.fulfilled, (state, action) => {
                state.chartData = action.payload.metrics;
                state.chartCategory = action.payload.categories;
                state.componentLoading = false;
            })
            .addCase(getChartData.rejected, (state, action: any) => {
                state.error = action.payload || {
                    message: 'Unknown error occurred',
                };
                toast.error((action.payload.message as string) || 'Unknown error occurred');
                state.componentLoading = false;
            });
    },
});

export default teamDashboardSlice.reducer;
