import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { RecruitersInitialStateType } from '../../../types/slices.type/agency/recruiters.slice.type';

const initialState: RecruitersInitialStateType = {
    recruiterProfilerecruitersList: { loading: true, error: null, count: 0, rows: [] },
    recruiterProfile: { loading: false, error: null,  data: null },
};

export const getRecruitersList = createAsyncThunk(
    'recruiters/getRecruitersList',
    async ({ limit, page }: { limit: number; page: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/team/list?page=${page}&limit=${limit}`,
            );
            return response.data.data;
        } catch (error: any) {
            return await withAsyncThunkErrorHandler(error, rejectWithValue);
        }
    },
);

const recruitersSlice = createSlice({
    name: 'recruiters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRecruitersList.pending, (state) => {
                state.recruiterProfilerecruitersList.loading = true;
                state.recruiterProfilerecruitersList.error = null;
            })
            .addCase(getRecruitersList.fulfilled, (state, action) => {
                state.recruiterProfilerecruitersList.rows = action.payload.rows;
                state.recruiterProfilerecruitersList.count = action.payload.count;
                state.recruiterProfilerecruitersList.loading = false;
            })
            .addCase(getRecruitersList.rejected, (state, action: any) => {
                state.recruiterProfilerecruitersList.error = action.payload || {
                    message: 'Unknown error occurred ',
                };
                toast.error((action.payload.message as string) || 'Unknown error occurred ');
                state.recruiterProfilerecruitersList.loading = false;
            });

    },
});

export default recruitersSlice.reducer;
