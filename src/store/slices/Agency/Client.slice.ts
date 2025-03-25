import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

interface InitialStateType {
	clientsList: any[];
	pageLoading: boolean;
	error: null | any;
}

const initialState: InitialStateType = {
	pageLoading: false,
	clientsList: [],
	error: null,
};

export const getClientsList = createAsyncThunk(
	'clients/getClientsList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/agency/clients');
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
		}
	},
);

export const clientsSlice = createSlice({
	name: 'clients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getClientsList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getClientsList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.clientsList = action.payload;
			})
			.addCase(getClientsList.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
			});
	},
});

export default clientsSlice.reducer;
