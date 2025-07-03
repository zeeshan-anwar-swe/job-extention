import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { withAsyncThunkErrorHandler } from '../../../utils/withAsyncThunkErrorHandler';
import { TeamCandidatesInitialStateType } from '../../../types/slices.type/team/teamCandidates.slice.type';

const initialState: TeamCandidatesInitialStateType = {
	list: { loading: true, error: null, rows: [], count: 0, search: '' },
};

export const getTeamCandidates = createAsyncThunk(
	'teamCandidates/getTeamCandidates',
	async (
		{
			page,
			limit,
			search = '',
			searchBy = '',
		}: { page: number; limit: number; search?: string; searchBy?: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.get(
				`team/test/candidates?page=${page}&limit=${limit}&search=${search}${searchBy && `&searchBy=${searchBy}`}`,
			);
			return response.data.data;
		} catch (error: any) {
			return await withAsyncThunkErrorHandler(error, rejectWithValue);
		}
	},
);

const teamCandidates = createSlice({
	name: 'teamCandidates',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.list.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTeamCandidates.pending, (state) => {
				state.list.loading = true;
				state.list.error = null;
			})
			.addCase(getTeamCandidates.fulfilled, (state, action) => {
				state.list.rows = action.payload.rows;
				state.list.count = action.payload.count;
				state.list.loading = false;
			})
			.addCase(getTeamCandidates.rejected, (state, action: any) => {
				state.list.error = action.payload || {
					message: 'Unknown error occurred ',
				};
				toast.error((action.payload.message as string) || 'Unknown error occurred ');
				state.list.loading = false;
			});
	},
});

export const { setSearch } = teamCandidates.actions;

export default teamCandidates.reducer;
