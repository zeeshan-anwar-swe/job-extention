import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

interface InitialStateType {
	candidatesList: any[];
	pageLoading: boolean;
	error: null | any;
	cadidateProfile: any | null;
}

const initialState: InitialStateType = {
	cadidateProfile: null,
	pageLoading: false,
	candidatesList: [],
	error: null,
};

export const getCandidatesList = createAsyncThunk(
	'candidates/getCandidatesList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/candidate/list');
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
		}
	},
);

export const getFilteredCandidates = createAsyncThunk(
	'candidates/getFilteredCandidates',
	async (
		{
			location = '',
			experiences = [],
			skills = [],
		}: { location?: string; experiences?: number[]; skills?: string[] },
		{ rejectWithValue },
	) => {
		try {
			const url = `/candidate/list?location=${location}&experiences=[${experiences}]&skills=${JSON.stringify(skills)}`;
			const response = await axiosInstance.get(url);
			if (response.data.data.length < 1) {
				toast.error('No candidates found');
				return [];
			} else {
				return response.data.data;
			}
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to get filtered candidates',
			);
		}
	},
);

export const getAllCandidatesList = createAsyncThunk(
	'candidates/getAllCandidatesList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`/candidate/list`);
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Failed to get filtered candidates',
			);
		}
	},
);

export const getCandidateProfile = createAsyncThunk(
	'candidates/getCandidatesList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/agency/candidates');
			return response.data.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Failed to change password');
		}
	},
);

export const candidatesSlice = createSlice({
	name: 'candidates',
	initialState,
	reducers: {
		setCandidateProfile: (state, action: PayloadAction<string>) => {
			if (state.candidatesList.length > 0) {
				state.cadidateProfile = state.candidatesList.find(
					(item) => item.id === action.payload,
				);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCandidatesList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getCandidatesList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.candidatesList = action.payload;
			})
			.addCase(getCandidatesList.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
			})

			.addCase(getFilteredCandidates.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getFilteredCandidates.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.candidatesList = action.payload;
			})
			.addCase(getFilteredCandidates.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
			})

			.addCase(getAllCandidatesList.pending, (state) => {
				state.pageLoading = true;
				state.error = null;
			})
			.addCase(getAllCandidatesList.fulfilled, (state, action) => {
				state.pageLoading = false;
				state.candidatesList = action.payload;
			})
			.addCase(getAllCandidatesList.rejected, (state, action) => {
				state.pageLoading = false;
				state.error = action.error.message || 'Failed to fetch jobs.';
			});
	},
});

export const { setCandidateProfile } = candidatesSlice.actions;
export default candidatesSlice.reducer;
