import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { TCustomCVInitialState } from '../../../types/slices.type/agency/custom-cv.slice.type';

const initialState: TCustomCVInitialState = {
	list: { loading: true, error: null, count: 0, rows: [], search: '' },
	cvDetails: { loading: false, error: null, data: null },
};

export const getCustomCVList = createAsyncThunk(
	'custom-cv/getCustomCVList',
	async (
		{ page, limit, search }: { limit: number; page: number; search?: string },
		{ rejectWithValue },
	) => {
		try {
			const url = search
				? `/custom-cv/agency/list?page=${page}&limit=${limit}&search=${search}`
				: `/custom-cv/agency/list?page=${page}&limit=${limit}`;
			const response = await axiosInstance.get(url);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const getCustomCVById = createAsyncThunk(
	'custom-cv/getCustomCVById',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/custom-cv/${id}/detail`);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const createCustomCV = createAsyncThunk(
	'custom-cv/createCustomCV',
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(`/custom-cv/create`, data);
			toast.success("CV created successfully")
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const updateCustomCV = createAsyncThunk(
	'custom-cv/updateCustomCV',
	async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(`/custom-cv/${id}/update`, data);
			toast.success("CV updated successfully")
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

export const deleteCustomCVById = createAsyncThunk(
	'custom-cv/deleteCustomCVById',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(`/custom-cv/${id}/delete`);
			return id;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

const customCVSlice = createSlice({
	name: 'custom-cv',
	initialState,
	reducers: {
		setCustomCVSearch: (state, action: PayloadAction<string>) => {
			state.list.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCustomCVList.pending, (state) => {
				state.list.loading = true;
				state.list.error = null;
			})
			.addCase(getCustomCVList.fulfilled, (state, action) => {
				state.list.rows = action.payload.rows;
				state.list.count = action.payload.count;
				state.list.loading = false;
			})
			.addCase(getCustomCVList.rejected, (state, action: any) => {
				state.list.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.list.loading = false;
			});

		builder
			.addCase(getCustomCVById.pending, (state) => {
				state.cvDetails.loading = true;
				state.cvDetails.error = null;
			})
			.addCase(getCustomCVById.fulfilled, (state, action) => {
				state.cvDetails.data = action.payload;
				state.cvDetails.loading = false;
			})
			.addCase(getCustomCVById.rejected, (state, action: any) => {
				state.cvDetails.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.cvDetails.loading = false;
			});

		builder
			.addCase(deleteCustomCVById.fulfilled, (state, action) => {
				state.list.rows = state.list.rows.filter((item: any) => item.id !== action.payload);
			})
			.addCase(deleteCustomCVById.rejected, (action: any) => {
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
			});
	},
});

export const { setCustomCVSearch } = customCVSlice.actions;
export default customCVSlice.reducer;
