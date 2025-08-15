import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';

export interface AdminListItemType {
	id: string;
	role: string;
	email: string;
	firstName: string;
	lastName: string;
	image: string | null;
	inviter: string | null;
}

interface AdminList {
	loading: boolean;
	error: Error | null;
	count: number;
	rows: AdminListItemType[];
	search: string;
}

interface AdminInitialStateType {
	adminList: AdminList;
	adminProfile: null | any;
}

const initialState: AdminInitialStateType = {
	adminList: { loading: true, error: null, count: 0, rows: [], search: '' },
	adminProfile: null,
};

export const getAdminList = createAsyncThunk(
	'admin/getAdminList',
	async (
		{ limit, page, search }: { limit: number; page: number; search?: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.get(
				`/admin/list?page=${page}&limit=${limit}&search=${search ?? ''}`,
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
	reducers: {
		setSearchForAdminList: (state, action: PayloadAction<string>) => {
			state.adminList.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAdminList.pending, (state) => {
				state.adminList.loading = true;
				state.adminList.error = null;
			})
			.addCase(getAdminList.fulfilled, (state, action) => {
				state.adminList.rows = action.payload.rows;
				state.adminList.count = action.payload.count;
				state.adminList.loading = false;
			})
			.addCase(getAdminList.rejected, (state, action: any) => {
				state.adminList.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.adminList.loading = false;
			});
	},
});

export default recruitersSlice.reducer;

export const { setSearchForAdminList } = recruitersSlice.actions;
