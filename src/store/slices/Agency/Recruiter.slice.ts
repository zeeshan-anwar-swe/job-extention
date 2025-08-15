import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { RecruitersInitialStateType } from '../../../types/slices.type/agency/recruiters.slice.type';

const initialState: RecruitersInitialStateType = {
    reccruitersList: { loading: true, error: null, count: 0, rows: [] , search: '' },
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
                state.reccruitersList.loading = true;
                state.reccruitersList.error = null;
            })
            .addCase(getRecruitersList.fulfilled, (state, action) => {
                state.reccruitersList.rows = action.payload.rows;
                state.reccruitersList.count = action.payload.count;
                state.reccruitersList.loading = false;
            })
            .addCase(getRecruitersList.rejected, (state, action: any) => {
                state.reccruitersList.error = action.payload || {
                    message: 'Unknown error occurred ',
                };
                toast.error((action.payload.message as string) || 'Unknown error occurred ');
                state.reccruitersList.loading = false;
            });

    },
});

export default recruitersSlice.reducer;
